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
import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import {  useNavigate } from 'react-router';
import { colorMap } from '../common/colorMap';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { getLocal } from '../services/localStorage';

const GET_ONE_PHOTO = gql`
    query GetOnePhoto($photoTitle: String!) {
        photoByTitle(title: $photoTitle) {
            description,
            uploadUser,
            imgBase64,
            likedUsers
        }
    }
`

const LIKE_ONE_PHOTO  = gql`
    mutation LikeOnePhoto($loggedInUser: String!, $photoTitle: String!) {
        likePhoto(username: $loggedInUser, photoTitle: $photoTitle) {
           likedPhotos
        }
    }
`

const UNLIKE_ONE_PHOTO  = gql`
    mutation UnLikeOnePhoto($loggedInUser: String!, $photoTitle: String!) {
        likePhoto(username: $loggedInUser, photoTitle: $photoTitle) {
           likedPhotos
        }
    }
`



const ImageCard = ({photoTitle, hideDeleteButton=true}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [likeStatus, setLikeStatus] = useState(false)
  const [openLikeAlert, setOpenLikeAlert] = useState(false);
  const [openUnlikeAlert, setOpenUnlikeAlert] = useState(false);

  var loggedInUser = getLocal();

  const [uploadUser, setUploadUser] = useState("")
  const [curDescription, setCurDescription] = useState("");
  const [curImgBase64, setCurImgBase64] = useState(""); 


  // GraphQL
  const {loading} = useQuery(GET_ONE_PHOTO, {
    onCompleted: (data) => {
      setCurDescription(data.photoByTitle.description);
      setCurImgBase64(data.photoByTitle.imgBase64);
      setUploadUser(data.photoByTitle.uploadUser);
      for (var i = 0; i < data.photoByTitle.likedUsers.length; i++) {
        if (loggedInUser === data.photoByTitle.likedUsers[i]) {
          setLikeStatus(true)
        }
      }
    },
    onError: (err)=> {alert(`${err} ${photoTitle}`)},
    variables: {
      photoTitle
    }
  })


  const [likePhoto] = useMutation(LIKE_ONE_PHOTO, {
    onCompleted: (data) => { setOpenLikeAlert(true)},
    onError: (err)=> {alert(`${err}`)},
    variables: {
      loggedInUser,
      photoTitle
    }
  })
  
  const [unLikePhoto] = useMutation(UNLIKE_ONE_PHOTO, {
    onCompleted: (data) => {setOpenUnlikeAlert(true)},
    onError: (err)=> {alert(`${err}`)},
    variables: {
      loggedInUser,
      photoTitle
    }
  })


  // Other services

  const handleLikeClose = () => {
    setOpenLikeAlert(false);
  };

  const handleUnlikeClose = () => {
    setOpenUnlikeAlert(false);
  };


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const handleLikeButton = () => {
    if (!likeStatus) {
      likePhoto()
      setLikeStatus(true)
    }
    else if (likeStatus) { 
      unLikePhoto()
      setLikeStatus(false)
    }
  };



  let navigate = useNavigate()
  const handleDelete = () => {
    navigate("/home/all-photos")
  }

  
  if (loading) return (
  <Card height="300" sx={{ maxWidth: 551 ,backgroundColor: "rgba(0,0,0,.5)" ,color: "#fff" }}>
    <CircularProgress color="inherit" />
  </Card>   
  )     
  
  let cardrightMargin = hideDeleteButton ? 55 : 50; 
  return (
    <Box>
        <Snackbar open={openLikeAlert} onClose={handleLikeClose} autoHideDuration={1800} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <Alert  severity="success" onClose={handleLikeClose} sx={{ width: '100%' }}>
            Like Image Successful
          </Alert>
        </Snackbar>
        <Snackbar open={openUnlikeAlert} onClose={handleUnlikeClose} autoHideDuration={1800} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <Alert  severity="warning" onClose={handleUnlikeClose} sx={{ width: '100%' }}>
            Unike Image Successful
          </Alert>
        </Snackbar>

    
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
                    <IconButton sx={{ color: likeStatus  ? '#ff5050' : '#bfbfbf',  width: "40px" }}  aria-label="add to favorites" onClick={handleLikeButton}>
                      <FavoriteIcon />
                    </IconButton>
                    { !hideDeleteButton && 
                    <IconButton aria-label="share" onClick={handleDelete}>
                      <DeleteForeverIcon sx={{ color: '#bfbfbf' }} />
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
    </Box>
  );
}

export default ImageCard;
