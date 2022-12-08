import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./index.css";
import { useNavigate } from 'react-router';
import { checkLoginStatus } from '../../services/checkLoginStatus';
import { gql, useLazyQuery } from '@apollo/client';
import { setLocal } from '../../services/localStorage';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';


const LOGINQUERY = gql`
  query Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
          username
          photos
          id
          likedPhotos
      }
  }`

export default function SignIn() {

  // Alert
  const [openAuthAlert, setOpenAuthAlert] = useState(false)
  const handleAuthClose = () => {
    setOpenAuthAlert(false)
  }

  // initial check
  let navigate = useNavigate()
  React.useEffect(() => {
    if (checkLoginStatus()) {
      navigate("/home/all-photos");
    }
  }, [navigate]);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);


  // graphql Query
  const [login] = useLazyQuery(LOGINQUERY, {
      onCompleted: (data) => {postLoginProcess(data.login === null ? null : data.login.username)},
      variables: {
        username,
        password
      }
    }
  )

  // other services
  const postLoginProcess = (verifiedUsername) => {
    if (verifiedUsername === null) {
      setOpenAuthAlert(true)
    }
    else {
      setLocal(verifiedUsername);
      navigate("/home/all-photos")
    }
  }

  // submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      setUsername(data.get('username'));
      setPassword(data.get('password'))
      login()
  };

  return (
    <Box className="LoginPage">
        <Snackbar open={openAuthAlert} onClose={handleAuthClose} autoHideDuration={1800} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert  severity="error" onClose={handleAuthClose} sx={{ width: '100%' }}>
              Username or password is not correct
            </Alert>
        </Snackbar>
      <Container component="main" maxWidth="xs" sx={{backgroundColor: "rgba(0,0,0,.45)" ,color: "#fff"}}>
  
        <Box
          sx={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box marginTop="40px" >
          <img  src="/harbour.png" alt='unavilable' width="200px" height="150px" style={{ cursor: "pointer", borderRadius: "90%", opacity: "0.75"}}></img>
          </Box>
          <Typography component="h1" variant="h4" color="#42a5f5 " marginTop="30px" marginBottom="20px">
            Photo Sharing Harbour
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
            <TextField
             sx={{input: {color: "#42a5f5 "}}}
            InputLabelProps={{className: "textfield__input"}}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
            />
            <TextField
             sx={{input: {color: "#42a5f5 "}}}
             InputLabelProps={{className: "textfield__input"}}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item marginBottom="20px">
                <Link href="/register" variant="b5" color={"#ffffff"} >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    </Box>
  );
}