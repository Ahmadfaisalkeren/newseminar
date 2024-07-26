import React from "react";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import Seminar from "./Seminar/Seminar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import Layout from "./Layout";

const Template = () => {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
};

export default Template;
