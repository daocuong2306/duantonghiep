import { Outlet } from "react-router-dom";
import Header from "../component/layout/header";
import Footer from "../component/layout/footer";
import Home from "../component/layout/home";
import MenuBar from "../component/layout/menu";

const LayoutWebsite = () => {
    return <div>
        <Header/>
       
        <Outlet />
        <Footer/>
    </div>;
};

export default LayoutWebsite;
