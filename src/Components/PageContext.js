import { Text } from 'ink';
import React, { useState } from 'react';

export const PageContext = React.createContext({});

const PageProvider = (props) => {
    const [currentPage, setCurrentPage] = useState(<Text>Loading...</Text>);
    return (
        <PageContext.Provider value={{ page: [currentPage, setCurrentPage] }}>
            {props.children}
        </PageContext.Provider>
    )
}

export default PageProvider;