import React from "react";
import Header from "./Header";

export default function Layout({ children, dataPiccas }) {
    return (
        <>
            <div className="wrapper">
                <Header pizzas={dataPiccas} />

                <div className="content">
                    <div className="container">{children}</div>
                </div>

                <h1>Footer</h1>
            </div>
        </>
    );
}
