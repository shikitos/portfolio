import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./pages"
import './App.css';
import { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        console.log("INITED")
    },[])

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    );
}

export default App;
