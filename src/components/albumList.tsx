import axios from "axios";
import { useEffect, useState } from "react";
import { ItemType } from "./types/Type";
import { useLocation, useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const itemData: ItemType[] = [
    { userId: 2, id: 1, title: "title1" },
    { userId: 2, id: 2, title: "title2" },
]

function AlbumList() {
    const baseUrl = "https://jsonplaceholder.typicode.com/albums/";

    const controller = new AbortController();
    const location = useLocation();
    let navigate = useNavigate();
    
    const [items, setItems] = useState<ItemType[]>(itemData);
    const [item, setItem] = useState<ItemType>({ userId: -1, id: -1, title: "" });

    let uId = location.state;

    useEffect(() => {
        axios.get(baseUrl, { signal: controller.signal }).then((response) => {
            const filtered = response.data.filter((item: ItemType) => item.userId == uId);
            console.log(filtered);
            setItems([...filtered]);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    const itemClick = (item: ItemType) => {
        console.log(item);
        // 새로운 컴포넌트 만들어서 그쪽으로 이동?
        setItem(item); // ...item으로 한다?
        // navigate ("라우터에서 정한 url", {selected item})
    }

    const btnClick = () => {
        setTimeout(() => { navigate(`/album/${item.id}`, { state: item }) }, 1000);  //페이지 이동 
    }

    return (
        <div className="container mt-3" style={{ "marginTop": "30px" }}>
            <div><h1 style={{display: "inline"}}>Album List</h1> <button type='button' className='button btn-primary' onClick={btnClick}>앨범 상세보기</button></div>
            
            <ol className='list-group list-group-flush'>
                {
                    items.map((i: ItemType, key: number) => {
                        return <li className='list-group-item' key={i.id} onClick={() => { itemClick(i); }}
                            style={i.id === item.id ? { "backgroundColor": "gray" } : { "backgroundColor": "white" }} >{key+1}. {i.title}</li>
                    })
                }
            </ol>
        </div >
    );
}

export default AlbumList;