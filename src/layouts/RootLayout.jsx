import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="  min-h-screen mx-auto ">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
