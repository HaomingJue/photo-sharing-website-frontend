import { gql, useQuery } from "@apollo/client"
import { Box } from "@mui/system";
import { useState } from "react";
import ImageCard from "../../../components/ImageCard";
import { getLocal } from "../../../services/localStorage"


const GET_ALL_LIKED_PHOTOS = gql`
    query GetAllLikedPhotos($loggedInUser: String!) {
        userByUsername(username: $loggedInUser) {
            likedPhotos
        }
    }
`

export const FavoritesPage = () => {
    let loggedInUser = getLocal();
    const [likedList, setLikedList] = useState([])
    useQuery(GET_ALL_LIKED_PHOTOS, {
        onCompleted: (data) => {
            setLikedList(data?.userByUsername?.likedPhotos);
        },
        onError: (err) => {alert(err)},
        variables: {
            loggedInUser
        }
    })


    return  (
        likedList.map((photoTitle) => {
            return (
            <Box key={photoTitle} HideDeleteButton={false}>
                <ImageCard photoTitle={photoTitle}/>
            </Box>
            )
        })
    )
}