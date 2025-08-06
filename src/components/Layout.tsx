import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="wrapper">
        <Header />

        <div className="content">
          <div className="container">
            <Outlet />
          </div>
        </div>

        {/* <h1>Footer</h1> */}
      </div>
    </>
  );
}
