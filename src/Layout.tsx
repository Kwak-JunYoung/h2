import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext, getStateFromLocalStorage } from "./components/Context";
import './App.css'
function Layout() {
    let context = useContext(AppContext);

    const storedState = getStateFromLocalStorage("appState");
    let navigate = useNavigate();

    useEffect(() => {
        if (storedState.isLogon) {
            context.dispatch({ type: "LOGON", value: storedState });
        }
    }, []);

    const logOut = () => {
        context.dispatch({ type: "LOGOUT", value: { userid: "", username: "", isLogon: false } });
        navigate("/", {});
    }

    return (
        <div>
            <header id="App-header" className="App-header">
                <h1 id="headerTxt">Hanaro Album</h1>
                <div id="userStatus-container">
                    <div id="userInfo-container">
                        <span id="context-uid">{context.state.userid} </span>
                        <span id="context-uname">{context.state.username} </span>
                    </div>
                    {context.state.userid ? (<button onClick={logOut} className="greenBtn">Sign Out</button>) : null}
                </div>
            </header>

            <Outlet />
        </div>
    );
}

export default Layout;