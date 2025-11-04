import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <main className="space-y-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
