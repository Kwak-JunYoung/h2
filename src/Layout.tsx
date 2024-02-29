import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext, saveStateToLocalStorage, getStateFromLocalStorage } from "./components/Context";

function Layout() {
    // 새로고침하면 로그인 정보가 사라지는 문제 해결
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
        saveStateToLocalStorage("appState", { userid: "", username: "", isLogon: false });
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