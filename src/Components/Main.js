import React, { useContext, useState } from 'react';
import SelectInput from 'ink-select-input';
import { Text } from 'ink';
import { PageContext } from './PageContext';
import Entries from './Entries';
import TextEditor from './TextEditor';
import { StorageContext } from '../Storage';

const Main = () => {
    const [page, setPage] = useContext(PageContext).page;
    const storage = useContext(StorageContext).storage;
    const handleSelect = item => {
        item.onClick();
    };
 
    const [items, setItems] = useState([
        {
            label: '➕ New diary entry',
            value: 'newEntry',
            onClick: () => { setPage(<TextEditor onSave={(data) => {
                storage.addEntry(data);
                setPage(<Main />)
            }} />) }
        },
        {
            label: '📕 Read entries',
            value: 'readEntries',
            onClick: () => { setPage(<Entries />) }
        }
    ]);
 
    return <SelectInput items={items} onSelect={handleSelect} />;
};
 
export default Main;