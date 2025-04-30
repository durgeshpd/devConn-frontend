import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

const Body = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Body;
