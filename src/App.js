import React, { useContext, useEffect } from 'react';
import { PageContext } from './Components/PageContext';
import Main from './Components/Main';

const App = () => {
    const [page, setPage] = useContext(PageContext).page;

    useEffect(() => {
        setPage(<Main />)
    }, [])
 
    return page;
};
 
export default App;