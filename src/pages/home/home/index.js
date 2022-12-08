import { gql, useQuery } from "@apollo/client"
import { Box} from "@mui/material"
import { useState } from "react";
import ImageCard from "../../../components/ImageCard"

const GET_ALL_PHOTOS = gql`
    query GetAllPhotos {
        allPhotos {
            title
        }
    }
`



export const AllPhotosPage = () => {
    const [photoList, setPhotoList] = useState([]);

    
    useQuery(GET_ALL_PHOTOS, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {setPhotoList(data.allPhotos)},
        onError: (err)=> {alert(`${err}`)},
    })
    

    return  (
        photoList.map((photo) => {
            return (
            <Box key={photo.title}>
                <ImageCard photoTitle={photo.title}/>
            </Box>
            )
        })

    )
}