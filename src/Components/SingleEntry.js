import { Newline, Text, useInput } from "ink";
import React, { useContext, useEffect, useState } from "react";
import { StorageContext } from "../Storage";
import useStdoutDimensions from 'ink-use-stdout-dimensions';
import Entries from "./Entries";
import { PageContext } from "./PageContext";
import SelectInput from 'ink-select-input-horizontal';
import TextEditor from "./TextEditor";

const SingleEntry = ({ entryId }) => {
    const storage = useContext(StorageContext).storage;
    const entry = storage.diary.find(e => e.id === entryId);
    const [columns, rows] = useStdoutDimensions();
    const [wholeMessage, setWholeMessage] = useState('');
    useEffect(() => {
        const splitted = entry.text.split('\n');
        const mess = [];
        splitted.forEach(e => {
            mess.push(e.substring(0, columns));
        })
        setWholeMessage(mess.slice(0, rows-3).join('\n'))
    }, [columns, rows])
    const [page, setPage] = useContext(PageContext).page;
    const handleSelect = item => {
        item.onClick();
    };
    const [items, setItems] = useState([
        {
            label: 'Back',
            value: 'newEntry',
            onClick: () => { setPage(<Entries />) }
        },
        {
            label: 'Edit',
            value: 'readEntries',
            onClick: () => { setPage(<TextEditor text={entry.text} onSave={(data) => {
                storage.editEntry(entryId, data);
                setPage(<SingleEntry entryId={entryId} />);
            }} />) }
        },
        {
            label: 'Delete',
            value: 'deleteEntry',
            onClick: () => {
                storage.deleteEntry(entryId);
                setPage(<Entries />);
            }
        }
    ]);
    return (
        <>
            <Text color="white">{wholeMessage}</Text>
            <Newline></Newline>
            <SelectInput items={items} onSelect={handleSelect} />
        </>
    )
}

export default SingleEntry;