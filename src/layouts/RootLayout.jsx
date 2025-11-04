import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <header className="bg-white shadow-sm">
        <Navbar />
      </header>
        <Outlet />
      
    </>
  );
};

export default RootLayout;
