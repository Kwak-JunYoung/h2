import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "./components/Context";

function Layout() {
    let context = useContext(AppContext);

    let navigate = useNavigate();

    useEffect(() => {
        console.log(context);
    }, [context]); // 상태 변경 시마다 useEffect 실행

    const logOut = () => {
        context.dispatch({ type: "LOGOUT", value: { userid: "", username: "", isLogon: false } });
        navigate("/");
    }

    console.log(context.state);
    return (
        <div>
            <h1 style={{"display": "inline"}}>Hanaro Album</h1>
            {
                context.state.isLogon ? <p>{context.state.userid} {context.state.username}</p> : <p>Login Please</p>
            }
            <button onClick={logOut}>Logout</button>
            <Outlet/>
        </div>
    );
}

export default Layout;