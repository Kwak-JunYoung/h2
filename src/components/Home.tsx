import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './Context';

function Home() {
    const [userId, setUserId] = useState<string>('');
    const [msg, setMsg] = useState('');

    const [resTxt, setResTxt] = useState('');

    let context = useContext(AppContext);
    let navigate = useNavigate();

    let onChange = (e: any) => {
        setUserId(e.target.value);
    }

    const logIn = () => {
        // User ID는 1~10번만 가능합니다.
        // 위 문구를 아래 condition이 match하지 않으면 출력
        const cond = parseInt(userId) >= 1 && parseInt(userId) <= 10;
        let url = "https://jsonplaceholder.typicode.com/users/" + userId;
        
        if (cond) {
            axios.get(url).then((response) => {
                const userData = response.data;
                let userName = userData.username;

                context.dispatch({ type: "LOGON", value: { userid: userId, username: userName, isLogon: true } });
                
                setTimeout(() => { navigate("/album", { state: userId }) }, 1000);  //페이지 이동 
                setMsg("");
            }).catch((error) => {
                alert("로그인에 실패했습니다.");
                setMsg("Login Fail");
            });
        }
        else {
            setResTxt("User ID는 1~10번만 가능합니다.");
            alert('User ID는 1~10번만 가능합니다.')
            setMsg("Login Fail");
        }
    }

    const logOut = () => {
        context.dispatch({ type: "LOGOUT", value: { userid: "", username: "", isLogon: false } });
    }

    return (
        <div>
            <input type="text" name="userId" id="userId" onChange={onChange} value={userId} placeholder="User ID..." />
            <button type="button" onClick={logIn}>Sign In</button>
            <div id="resultText" style={{ "color": "red" }}>{resTxt}</div>
            {/* <Outlet/> */}
        </div>
    )

}

export default Home;