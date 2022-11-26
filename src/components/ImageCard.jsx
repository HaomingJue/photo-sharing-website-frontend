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
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';


const ImageCard = ({image, hideDeleteButton=false}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [favoriteColor, setFavoriteColor] = React.useState('#bfbfbf');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setFavoriteColor(favoriteColor === '#bfbfbf' ? '#ff5050' : '#bfbfbf'); 
};


  
  let cardrightMargin = hideDeleteButton ? 55 : 50;
  

  return (
    
    <Card sx={{ maxWidth: 551 ,backgroundColor: "rgba(0,0,0,.5)" ,color: "#fff" }}>
      
      <CardHeader
        avatar={
          <Avatar color>r</Avatar>
        //   <img
        //   alt="profile-user"
        //   width="40px"
        //   height="40px"
        //   src={"/user-icons/elon-musk.png"}
        //   style={{ cursor: "pointer", borderRadius: "50%" }}
        // />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: 'transparent' }}/>
          </IconButton>
        }
        title={<Typography variant={"h6"}>Gelloo</Typography>}
      
      />
      <CardMedia
        component="img"
        height="300"
        image={image}
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
                  <ShareIcon sx={{ color: '#bfbfbf' }}/>
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ImageCard;
