// import { gql, useMutation } from "@apollo/client"
import { Button, Grid, TextareaAutosize, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import ReactDropZone from "../../../components/DropZone"


// const ADD_USER = gql`
//   mutation addUser($username: String!, $password: String!) {
//       addUser(username: $username, password: $password) {
//           username
//       }
//   }`



export const UploadPhotoPage = () => {

    const [imageBase64, setImageBase64] = useState("")

    function imageToBase614(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImageBase64(reader.result.split(",")[1])
        };
        reader.onerror = function (error) {
          alert('Upload Error: ', error);
        };
     }

    const handleOnDrop = (imgData) => {
        imageToBase614(imgData[0])
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
          console.log(imageBase64)
          console.log(data.get('title'));
          console.log(data.get('description'));
      };
    
    // GraphQL
    // const [registerAccount] = useMutation(ADD_USER, {
    //     onCompleted: (data) => {console.log("data", data);finishRegistration(data.addUser.username)},
    //     variables: {
    //         username,
    //         password
    //     }
    // })


    return (
        <Box marginTop={"50px"}  component="form" onSubmit={handleSubmit}>
            <Grid
            container
            spacing={4}
            direction="column"
            alignItems="center"
            >
            <Grid item>
                <Typography variant="h4">
                    Upload Your Photo
                </Typography>
            </Grid>
            <Grid item>
                <ReactDropZone onDrop={handleOnDrop}/>
            </Grid>   
            <Grid item>
                <TextareaAutosize
                    name="title"
                    minRows={2}
                    maxRows={2}
                    color="white"
                    aria-label="maximum height"
                    placeholder="Maximum 2 rows"
                    defaultValue="Write down your photo's title here."
                    style={{
                        width:"410px",
                        flex: 1,
                        padding: "20px",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 2,
                        borderColor: '#eeeeee',
                    
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: '#bdbdbd',
                        outline: 'none',
                        transition: 'border .24s ease-in-out'
                    }}
                />
            </Grid>
            <Grid item>
                <TextareaAutosize
                    name="description"
                    minRows={25}
                    maxRows={25}
                    aria-label="maximum height"
                    placeholder="Maximum 25 rows"
                    defaultValue="Record your story and description here."
                    style={{
                        width:"410px",
                        flex: 1,
                        padding: "20px",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 2,
                        borderColor: '#eeeeee',
                   
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: '#bdbdbd',
                        outline: 'none',
                        transition: 'border .24s ease-in-out'
                    }}
                />
            </Grid>
            <Grid item >
                <Button  type="submit" sx={{backgroundColor: "#9966ff", width: "200px", marginTop:"30px"}}>
                    <Typography color={"white"}>
                        Upload
                    </Typography>
                </Button>
            </Grid>   
        </Grid> 
        </Box>

    )
}