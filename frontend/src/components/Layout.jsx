import {Outlet, useLocation} from "react-router-dom";
import Navbar from "./Navbar";
export default function Layout(){
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    return (
        <>
            {!isHomePage && <Navbar />}
            <Outlet />
        </>
    )
}