import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Layout = () => {
  console.log('f');
  
  return (
    <>

      <Header/>
        <Outlet />
        <Footer/>

    </>
  );
};

export default Layout;