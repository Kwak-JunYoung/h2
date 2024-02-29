import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ItemType, PhotoType } from "./types/Type";

function PictureList() {
    const location = useLocation();
    const locationState = location.state? location.state : {};
    const albumId = locationState.id;
    const userId = locationState.userId;
    const albumTitle = locationState.title;
    const [thumbnails, setThumbnails] = useState<PhotoType[]>([]);
    const [albumInfo, setAlbumInfo] = useState<ItemType>(locationState);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController(); //객체가 여기서 만들어져야 한다 
        const baseUrl = "https://jsonplaceholder.typicode.com/photos";
        const qryStr = `?albumId=${albumId}`;
        const finUrl = baseUrl + qryStr;

        axios.get(finUrl).then((response) => {
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
            <h2 id="albumTitle">{albumTitle}</h2>
            <ul>
                {
                    thumbnails.map((item: PhotoType, key: number) => {
                        return <img src={item.thumbnailUrl} alt={item.title} key={key} className="thumbnail" />
                    })
                }
            </ul>
            <button onClick={() => { navigate("/album", { state: albumInfo }) }} className="btn btn-primary">뒤로</button>
        </div>
    )
}

export default PictureList;