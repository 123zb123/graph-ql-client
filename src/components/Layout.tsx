import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Layout = () => {
  console.log('2');
  
  return (
    <>

      <Header/>
        <Outlet />
        <Footer/>

    </>
  );
};

export default Layout;