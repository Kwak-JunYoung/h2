import axios from "axios";
import { useEffect } from "react";

function AlbumList() {
    const baseUrl = "https://jsonplaceholder.typicode.com/albums/";

    const controller = new AbortController();


    useEffect(() => {
        axios.get(baseUrl, { signal: controller.signal }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div>
            <h1>Album List</h1>
        </div>
    );
}

export default AlbumList;