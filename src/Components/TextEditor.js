import { Newline, Text, useInput } from "ink";
import React, { useCallback, useEffect, useState } from "react";
import useIsMounted from 'react-is-mounted-hook';
import clipboardy from 'clipboardy';

function parseText(data) {
    return (data.map(e => {
        if(e.type === Newline) {
            return '\n';
        }
        return e.props.children;
    })).join('');
}

const genKey = (length) => {
    return [...Array(length)]
      .map((e) => ((Math.random() * 36) | 0).toString(36))
      .join('');
}

function parseParamText(text) {
    // this is a temporary solution, should be replaced with something more secure
    return text.replace(/\n/g, `^`).split('').map(e => {
        if(e === '^') {
            return <Newline />;
        } else {
            return <Text>{e}</Text>
        }
    });
}

const TextEditor = ({ onSave, text = '' }) => {
    const isMounted = useIsMounted();
    const [cursor, setCursor] = useState(text.length);
    const [values, setValues] = useState(parseParamText(text));
    const [cursorStatus, setCursorStatus] = useState(true);
    const setCursorIndex = useCallback((value) => {
        const toSet = cursor+value;
        if(toSet > values.length) {
            setCursor(values.length + 1)
        } else if (toSet < 0) {
            setCursor(0);
        } else {
            setCursor(toSet);
        }
    }, [cursor, values])
    const handleInput = useCallback((key) => {
        const duplicate = values.slice();
        duplicate.splice(cursor, 0, key);
        setCursorIndex(1);
        setValues(duplicate);
        setCursorStatus(true);
    }, [values, cursor])
    const deleteChar = useCallback(() => {
        const duplicate = values.slice();
        duplicate.splice(cursor-1, 1);
        setCursorIndex(-1);
        setValues(duplicate);
        setCursorStatus(true);
    }, [values, cursor])
    useInput((input, key) => {
        switch(true) {
            case key.return:
                handleInput(<Newline />);
                break;
            case key.delete:
                deleteChar();
                break;
            case key.leftArrow || key.upArrow:
                setCursorIndex(-1);
                break;
            case key.rightArrow || key.downArrow:
                setCursorIndex(1);
                break;
            case key.tab:
                handleInput(<Text>{'\u0009'}</Text>);
                break;
            case key.ctrl:
                if(input.toLowerCase() === 's') {
                    onSave(parseText(values));
                } else if(input.toLowerCase() === 'v') {
                    const clipboard = clipboardy.readSync();
                    handleInput(<Text>{clipboard}</Text>);
                }
                break;
            default:
                handleInput(<Text>{input}</Text>);
                break;
        }
	});
    const updateCursor = useCallback(() => {
        if(isMounted()) {
            setCursorStatus(!cursorStatus);
        }
    }, [cursorStatus])
    useEffect(() => {
        if(isMounted()) {
            setTimeout(() => {
                updateCursor();
            }, 700)
        }
    }, [cursorStatus, isMounted])
    return (
        <Text>
            <Text backgroundColor="white" color="black"> New diary entry {cursor}</Text>
            <Newline count={2}></Newline>
            {values.length === 0 && (
                <Text>{cursorStatus ? '\u258C' : ''}</Text>
            )}
            {values.map((e, i) => {
                if(i+1 === cursor && i === values.length-1) {
                    return <React.Fragment key={i}>{e}<Text>{cursorStatus ? '\u258C' : ''}</Text></React.Fragment>
                } else if (i === cursor) {
                    return <Text key={i} backgroundColor="whiteBright" color="black">{e}</Text>
                } else {
                    return <React.Fragment key={i}>{e}</React.Fragment>;
                }
            })}
        </Text>
    )
}

export default TextEditor;