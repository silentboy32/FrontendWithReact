

import React from "react";
import Footer from "./components/Footer/footer.jsx";
import Header from "./components/Header/header.jsx";
import { Outlet } from "react-router-dom";

function Layout(){

    return(
        <>
        < Header />
        < Outlet />
        < Footer />
        </>
    )
}


export default Layout