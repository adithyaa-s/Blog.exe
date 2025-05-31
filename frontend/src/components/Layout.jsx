import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

export default function Layout() {
  const [showSidebar, setShowSidebar] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    setShowSidebar(false);
  }, [location]);

  const handleOpen = () => {
    setShowSidebar(true);
  };
  const handleClose = () => {
    setShowSidebar(false);
  };

  const isHomePage = location.pathname === "/";
  return (
    <>
        {!isHomePage && (
            <>
            <Navbar handleOpen={handleOpen} />
            <Sidebar show={showSidebar} handleClose={handleClose} />
            </>
        )}
      <Outlet />
    </>
  );
}
