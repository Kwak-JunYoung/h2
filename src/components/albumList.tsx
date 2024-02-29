import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { ItemType } from "./types/Type";
import { useLocation, useNavigate } from "react-router-dom";

const itemData: ItemType[] = [
]

function AlbumList() {
    const baseUrl = "https://jsonplaceholder.typicode.com/albums/";

    const location = useLocation();
    let navigate = useNavigate();

    const [items, setItems] = useState<ItemType[]>(itemData);
    const [item, setItem] = useState<ItemType>(location.state || {});

    useEffect(() => {
        const controller = new AbortController();

        axios.get(baseUrl, { signal: controller.signal }).then((response) => {
            const filtered = response.data.filter((i: ItemType) => i.userId == location.state.userId);
            setItems([...filtered]);
        }).catch((error) => {
            console.log(error);
        })
        return () => {
            controller.abort();
        }
    }, []);

    const itemClick = (item: ItemType) => {
        setItem(item);
    }

    const btnClick = () => {
        setTimeout(() => { navigate(`/album/${item.id}`, { state: item }) }, 100);  //페이지 이동 
    }

    return (
        <div className="container mt-3" style={{ "marginTop": "30px" }}>
            <div>
                <h1 id="albumList-txt">앨범 목록</h1>
                <button type='button' className='button btn-primary greenBtn' onClick={btnClick}>앨범 상세보기</button>
            </div>

            <ol className='list-group list-group-flush'>
                {
                    items.map((i: ItemType, key: number) => {
                        return <li
                            className='list-group-item'
                            key={i.id}
                            onClick={() => { itemClick(i); }}
                            style={i.id === item.id ? { "backgroundColor": "gray" } : { "backgroundColor": "white" }} >
                            {key + 1}. {i.title}
                        </li>
                    })
                }
            </ol>
        </div >
    );
}

export default AlbumList;