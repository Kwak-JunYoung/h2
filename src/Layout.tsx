import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "./components/Context";

function Layout() {
    let context = useContext(AppContext);

    useEffect(() => {
        console.log(context);
    }, [context]); // 상태 변경 시마다 useEffect 실행

    console.log(context.state);
    return (
        <div>
            <h1>Hanaro Album</h1>
            {
                context.state.isLogon ? <p>안녕하세요 {context.state.username}님</p> : <p>Login Please</p>
            }
            <Outlet/>
        </div>
    );
}

export default Layout;