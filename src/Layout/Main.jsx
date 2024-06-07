import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";


const Main = () => {
    return (
        <>
            <div>
                <Outlet></Outlet>
            </div>
                <Footer></Footer>
        </>
    );
};

export default Main;