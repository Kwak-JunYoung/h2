import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext, getStateFromLocalStorage } from "./components/Context";

function Layout() {
    let context = useContext(AppContext);

    const storedState = getStateFromLocalStorage("appState");
    let navigate = useNavigate();

    useEffect(() => {
        if (storedState) {
            context.dispatch({ type: "LOGON", value: storedState });
        }
    }, []);

    const logOut = () => {
        context.dispatch({ type: "LOGOUT", value: { userid: "", username: "", isLogon: false } });
        navigate("/", {});
    }

    return (
        <div>
            <h1 style={{ "display": "inline" }}>Hanaro Album</h1>
            {
                <p>{context.state.userid} {context.state.username}</p>
            }
            <button onClick={logOut}>Logout</button>
            <Outlet />
        </div>
    );
}

export default Layout;