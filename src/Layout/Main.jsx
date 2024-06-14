import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";


const Main = () => {

    const location = useLocation();
    const noFooter = location.pathname.includes('login') || location.pathname.includes('signup') || location.pathname.includes('payment')


    return (
        <>
            <div className="max-w-screen-xl mx-auto">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
                { noFooter || <Footer></Footer> }
        </>
    );
};

export default Main;