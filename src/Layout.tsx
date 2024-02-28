import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <h1>Hanaro Album</h1>
            <input type="text" placeholder="User ID..." />
            <button type="button">Sign In</button>
            <div id="resultText"></div>
            <Outlet/>
        </div>
    );
}

export default Layout;