import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { PhotoType } from "./types/Type";

function PictureList() {
    const location = useLocation();
    const albumId = location.state.id;

    const [thumbnails, setThumbnails] = useState<PhotoType[]>([]);

    axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`).then((response) => {
        setThumbnails(response.data);
    }
    ).catch((error) => {
        console.log(error);
    })

    return (
        <div>
            <p>picture Page</p>
            <ul>
                {
                    thumbnails.map((item: PhotoType, key: number) => {
                        return <img src={item.thumbnailUrl} alt={item.title} key={key} />
                    })
                }
            </ul>
        </div>
    )
}

export default PictureList;