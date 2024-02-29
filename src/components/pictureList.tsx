import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { PhotoType } from "./types/Type";

function PictureList() {
    const location = useLocation();
    const albumId = location.state.id;
    const [thumbnails, setThumbnails] = useState<PhotoType[]>([]);
    const [albumTitle, setAlbumTitle] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController(); //객체가 여기서 만들어져야 한다 

        axios.get(`https://jsonplaceholder.typicode.com//photos?albumId=${albumId}`).then((response) => {
            setAlbumTitle(location.state.title);
            setThumbnails(response.data);
        }
        ).catch((error) => {
            console.log(error);
        })
        return () => {
            console.log("마지막 정리작업을 하고 나간다 ");
            controller.abort();
            // Deactivate axios for memory efficiency
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
            <button onClick={() => { navigate("/album", { state: location.state.userId }) }}>돌아가기</button>
        </div>
    )
}

export default PictureList;