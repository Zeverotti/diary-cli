import SelectInput from "ink-select-input";
import React, { useContext, useState } from "react";
import { PageContext } from "./PageContext";
import { StorageContext } from "../Storage";
import SingleEntry from "./SingleEntry";

const Entries = () => {
    const [page, setPage] = useContext(PageContext).page;
    const storage = useContext(StorageContext).storage;
    const [items, setItems] = useState(storage.diary.map(e => ({ 
        label: `${e.date} | ${e.text.substring(0, 30)}...`, 
        value: e.id 
    })));

    return <SelectInput items={items} onSelect={(item) => { setPage(<SingleEntry entryId={item.value} />) }} />;
}

export default Entries;