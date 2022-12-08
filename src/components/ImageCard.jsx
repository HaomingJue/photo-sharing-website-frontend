import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import {  useNavigate } from 'react-router';
import { colorMap } from '../common/colorMap';
import { CircularProgress } from '@mui/material';

const GET_ONE_PHOTO = gql`
    query GetOnePhoto($photoTitle: String!) {
        photoByTitle(title: $photoTitle) {
            description,
            uploadUser,
            imgBase64,
        }
    }
`


const ImageCard = ({photoTitle, hideDeleteButton=false}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [favoriteColor, setFavoriteColor] = React.useState('#bfbfbf');

  const [uploadUser, setUploadUser] = useState("")
  const [curDescription, setCurDescription] = useState("");
  const [curImgBase64, setCurImgBase64] = useState(""); 
  const [likedList, setLikedList] = useState([])

  console.log(photoTitle)
  // GraphQL
  const {loading} = useQuery(GET_ONE_PHOTO, {
    onCompleted: (data) => {
      setCurDescription(data.photoByTitle.description);
      setCurImgBase64(data.photoByTitle.imgBase64);
      setUploadUser(data.photoByTitle.uploadUser);
      setLikedList(data.photoByTitle.likedList);
      console.log({uploadUser, curDescription, photoTitle, likedList})
    },
    onError: (err)=> {alert(`${err} ${photoTitle}`)},
    variables: {
      photoTitle
    }
  })

  // Other services
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setFavoriteColor(favoriteColor === '#bfbfbf' ? '#ff5050' : '#bfbfbf'); 
  };

  let navigate = useNavigate()
  const handleDelete = () => {
    navigate("/home/all-photos")
  }

  console.log(uploadUser.toUpperCase().substring(0,1))

  
  if (loading) return (
  <Card height="300" sx={{ maxWidth: 551 ,backgroundColor: "rgba(0,0,0,.5)" ,color: "#fff" }}>
    <CircularProgress color="inherit" />
  </Card>   
  )     
  
  let cardrightMargin = hideDeleteButton ? 55 : 50; 
  return (
    
    <Card sx={{ maxWidth: 551 ,backgroundColor: "rgba(0,0,0,.5)" ,color: "#fff" }}>
      
      <CardHeader
        avatar={
            <Avatar sx={{ bgcolor: colorMap[uploadUser.toUpperCase()[0]] }} aria-label="recipe">
              {uploadUser.toUpperCase()[0]}
            </Avatar>

        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: 'transparent' }}/>
          </IconButton>
        }
        title={<Typography variant={"h6"}>{uploadUser}</Typography>}
      
      />
      <CardMedia
        component="img"
        height="300"
        image={curImgBase64}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" color="white">
          This impressive paella 
        </Typography>
      </CardContent>
      <CardActions >

            <Box marginRight={cardrightMargin}>
                <IconButton sx={{ color: favoriteColor,  width: "40px" }}  aria-label="add to favorites" onClick={handleLike}>
                  <FavoriteIcon />
                </IconButton>
                { !hideDeleteButton && 
                <IconButton aria-label="share">
                  <DeleteForeverIcon sx={{ color: '#bfbfbf' }} onClick={handleDelete}/>
                </IconButton>
                }
            </Box>
            <Box marginLeft={10}>
              <IconButton onClick={handleExpandClick} >
                {expanded === false ? (
                  <ExpandMoreOutlined sx={{ color: '#bfbfbf' }}  />) :
                  <ExpandLessOutlined sx={{ color: '#bfbfbf' }}  />
                  }   
              </ IconButton>
            </Box>
  
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            {curDescription}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ImageCard;
