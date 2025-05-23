import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout({ children, dataPiccas }) {
    return (
        <>
            <div className="wrapper">
                <Header pizzas={dataPiccas} />

                <div className="content">
                    {/* <div className="container">{children}</div> */}
                    <div className="container">
                        <Outlet />
                    </div>
                </div>

                <h1>Footer</h1>
            </div>
        </>
    );
}
