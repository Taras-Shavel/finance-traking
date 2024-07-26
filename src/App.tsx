import React from 'react';
import './App.css';
import {History, MainPage, Money} from "./components";
import {Route, Routes} from "react-router";
import {MainLayout} from "./layouts";

function App() {
  return (
    <Routes>
        <Route path={'/'} element={<MainLayout/>}>
            <Route path={'/'} index element={<MainPage/>}/>
            <Route path={'/money'} element={<Money/>}/>
            <Route path={'/history'} element={<History/>}/>
        </Route>
    </Routes>
  );
}

export default App;
