import React from "react";
import { Outlet } from "react-router";
import "./Home.css";
import Navigation from "./Navigation/Navigation";

const Home = () => {
    return (
        <div className='home-container'>
            <Navigation />
            <Outlet />
        </div>
    );
};

export default Home;
