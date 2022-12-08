import { gql, useQuery } from "@apollo/client"
import { Box } from "@mui/system";
import { useState } from "react";
import ImageCard from "../../../components/ImageCard";
import { getLocal } from "../../../services/localStorage"


const GET_ALL_UPLOADED_PHOTOS = gql`
    query GetAllLikedPhotos($loggedInUser: String!) {
        userByUsername(username: $loggedInUser) {
            photos
        }
    }
`

export const MySpacePage = () => {
    let loggedInUser = getLocal();
    const [likedList, setLikedList] = useState([])
    useQuery(GET_ALL_UPLOADED_PHOTOS, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            setLikedList(data?.userByUsername?.photos);
        },
        onError: (err) => {alert(err)},
        variables: {
            loggedInUser
        }
    })


    return  (
        likedList.map((photoTitle) => {
            return (
            <Box key={photoTitle}>
                <ImageCard photoTitle={photoTitle} hideDeleteButton={false}/>
            </Box>
            )
        })
    )
}