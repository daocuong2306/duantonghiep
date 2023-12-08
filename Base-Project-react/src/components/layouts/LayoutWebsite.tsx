import { Outlet } from "react-router-dom";
import Header from "../component/layout/header";
import Footer from "../component/layout/footer/footer";

const LayoutWebsite = () => {
    return <div>
        <Header />

        <Outlet />
        <Footer />
    </div>;
};

export default LayoutWebsite;
