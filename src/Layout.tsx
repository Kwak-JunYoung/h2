import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <h1>Hanaro Album</h1>
            <Outlet/>
        </div>
    );
}

export default Layout;