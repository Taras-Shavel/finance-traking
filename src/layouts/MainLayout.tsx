import React from 'react';
import {Header} from "../components";
import {Outlet} from "react-router";

const MainLayout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};