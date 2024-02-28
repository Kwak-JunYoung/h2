import { useLocation, useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PhotoType } from "./types/Type";
import { AppContext, getStateFromLocalStorage } from "./Context";

function PictureList() {
    const location = useLocation();
    const albumId = location.state.id;
    const [thumbnails, setThumbnails] = useState<PhotoType[]>([]);
    const [albumTitle, setAlbumTitle] = useState<string>('');

    let context = useContext(AppContext); 
    
    const navigate = useNavigate();
    // navigate("/album", { state: userId }
    useEffect(() => {
        const controller = new AbortController(); //객체가 여기서 만들어져야 한다 

        context.state = getStateFromLocalStorage("appState");//로그온한 아이디가져오고 다른 정보 불러온다 

        axios.get(`https://jsonplaceholder.typicode.com//photos?albumId=${albumId}`).then((response) => {
            setAlbumTitle(location.state.title);
            setThumbnails(response.data);
        }
        ).catch((error) => {
            console.log(error);
        })
        return () => {
            console.log("마지막 정리작업을 하고 나간다 ");
            console.log(location)
            controller.abort(); //메모리 누스 해제, 백그라운드에서 작동중인 
            //axios등을 멈추게 할 수 있다  
        }
    }, []);


    return (
        <div>
            <p>{albumTitle}</p>
            <ul>
                {
                    thumbnails.map((item: PhotoType, key: number) => {
                        return <img src={item.thumbnailUrl} alt={item.title} key={key} />
                    })
                }
            </ul>
            <button onClick={() => { navigate("/album",  { state: location.state.userId }) }}>돌아가기</button>
        </div>
    )
}

export default PictureList;