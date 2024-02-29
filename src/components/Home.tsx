import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './Context';
import { ItemType } from './types/Type';

function Home() {

    let context = useContext(AppContext);
    let navigate = useNavigate();

    const [userId, setUserId] = useState<string>('');
    const [resTxt, setResTxt] = useState('');

    let onChange = (e: any) => {
        setUserId(e.target.value);
    }

    const logIn = () => {
        // User ID는 1~10번만 가능합니다.
        // 위 문구를 아래 condition이 match하지 않으면 출력
        const cond = parseInt(userId) >= 1 && parseInt(userId) <= 10;
        let url = "https://jsonplaceholder.typicode.com/users/" + userId;

        if (cond) {
            const controller = new AbortController();
            axios.get(url).then((response) => {
                const userData = response.data;
                let userName = userData.username;

                context.dispatch({ type: "LOGON", value: { userid: userId, username: userName, isLogon: true } });
                let albumState: ItemType = { userId: parseInt(userId), id: -1, title: "" };
                setTimeout(() => { navigate("/album", { state: albumState }) }, 1000);  //페이지 이동 
            }).catch((error) => {
                alert("로그인에 실패했습니다.");
            });
            return () => {
                controller.abort();
            }
        }
        else {
            setResTxt("User ID는 1~10번만 가능합니다.");
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            logIn();
        }
    }

    return (
        <div>
            <input type="text" name="userId" id="userId" onChange={onChange} value={userId} placeholder="User ID..." onKeyDown={handleKeyPress} />
            <button type="button" onClick={logIn} className='greenBtn'>Sign In</button>
            <div id="resultText" style={{ "color": "red" }}>{resTxt}</div>
        </div>
    )

}

export default Home;