import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { Alert, Button, Card, CircularProgress, Grid, Snackbar, TextareaAutosize, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import ReactDropZone from "../../../components/DropZone"
import { getLocal } from "../../../services/localStorage"


const ADD_PHOTO = gql`
  mutation addPhoto($curTitle: String!, $curDescription: String!, $curUsername: String!, $curImageBase64: String!) {
      addPhoto(title: $curTitle, description : $curDescription, uploadedUser: $curUsername, imgBase64: $curImageBase64) {
          title
      }
  }`

const CEHECK_PHOTO_TITLE = gql`
query checkPhotoTitle($curTitle: String!) {
  photoByTitle(title: $curTitle) {
      title
  }
}`




export const UploadPhotoPage = () => {

    const [curTitle, setCurTitle] = useState("")
    const [curDescription, setCurDescription] = useState("")
    const [curUsername, setCurUsername] = useState("")
    const [curImageBase64, setCurImageBase64] = useState("")

    const [openUploadAlert, setOpenUploadAlert] = useState(false)
    const [openPhotoAlert, setOpenPhotoAlert] = useState(false)
    const [openTitleAlert, setOpenTitleAlert] = useState(false)
    const [openDescAlert, setOpenDescAlert] = useState(false)
    const [openExistAlert, setOpenExistAlert] = useState(false)
    
    
    // Alert
    const handleUploadClose = () => {
        setOpenUploadAlert(false)
    }
    const handleTitleClose = () => {
        setOpenTitleAlert(false)
    }
    const handleDescClose = () => {
        setOpenDescAlert(false)
    }
    const handlePhotoClose = () => {
        setOpenPhotoAlert(false)
    }
    const handleExistClose = () => {
        setOpenExistAlert(false)
    }


    // GraphQL
    const [checkPhotoTitle] = useLazyQuery(CEHECK_PHOTO_TITLE, {
        onCompleted: (data) => {examinePhoto(data.photoByTitle === null ? null : data.photoByTitle.title)},
        onError: (err)=> {alert(`${err}`)},
        variables: {
          curTitle,
        }
      })
    

    const [uploadImage, {loading}] = useMutation(ADD_PHOTO, {
        onCompleted: (data) => {setOpenUploadAlert(true)},
        onError: (err)=> {alert(`${err}`)},
        variables: {
            curTitle,
            curDescription,
            curUsername,
            curImageBase64
        }
    })
    
    // Other services


    const examinePhoto = (photoTitle) => {
        if (curImageBase64 === "") {
            setOpenPhotoAlert(true)
        }
        else if (curTitle === "") {
            setOpenTitleAlert(true)
        }
        else if (curDescription === "") {
            setOpenDescAlert(true)
        }
        else if (photoTitle === null) {
            uploadImage()
        }
        else {
            setOpenExistAlert(true)
        }
    }

    function imageToBase614(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setCurImageBase64(reader.result)
        };
        reader.onerror = function (error) {
          alert('Upload Error: ', error);
        };
     }

    const handleOnDrop = (imgData) => {
        imageToBase614(imgData[0])
    }


    // Submit Form
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setCurUsername(getLocal())
        setCurTitle(data.get('title'));
        setCurDescription(data.get('description'));
        checkPhotoTitle()
      };
    if (loading) return (
    <Card  sx={{ maxWidth: 551 ,backgroundColor: "rgba(0,0,0,.5)" ,color: "#fff" }}>
        <CircularProgress color="inherit" />
    </Card>   
    )   

    return (
        <Box>        
            <Snackbar open={openUploadAlert} onClose={handleUploadClose} autoHideDuration={1800} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert  severity="success" onClose={handleUploadClose} sx={{ width: '100%' }}>
                Upload Successful
                </Alert>
            </Snackbar>
            <Snackbar open={openPhotoAlert} onClose={handlePhotoClose} autoHideDuration={1800} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert  severity="error" onClose={handlePhotoClose} sx={{ width: '100%' }}>
                Photo is empty
                </Alert>
            </Snackbar>
            <Snackbar open={openTitleAlert} onClose={handleTitleClose} autoHideDuration={1800} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert  severity="error" onClose={handleTitleClose} sx={{ width: '100%' }}>
                Title is empty
                </Alert>
            </Snackbar>
            <Snackbar open={openDescAlert} onClose={handleDescClose} autoHideDuration={1800} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert  severity="error" onClose={handleDescClose} sx={{ width: '100%' }}>
                Description is empty
                </Alert>
            </Snackbar>
            <Snackbar open={openExistAlert} onClose={handleExistClose} autoHideDuration={1800} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert  severity="error" onClose={handleExistClose} sx={{ width: '100%' }}>
                Photo title already exists
                </Alert>
            </Snackbar>
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
                    {(curImageBase64 !== "" ) && <Grid item>
                            <img src={curImageBase64} alt="error" width="80px" height="60px"/>
                        </Grid>   
                    }
                    <Grid item>
                        <TextareaAutosize
                            name="title"
                            minRows={2}
                            maxRows={2}
                            color="white"
                            aria-label="maximum height"
                            placeholder="Write down your photo's title here."
                            defaultValue=""
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
                            minRows={20}
                            maxRows={25}
                            aria-label="maximum height"
                            placeholder="Record your story and description here."
                            defaultValue=""
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
        </Box>
    )
}