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
import { useMutation, gql, useLazyQuery } from "@apollo/client"; 
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
      addUser(username: $username, password: $password) {
          username
      }
  }`

const CHECK_USER = gql`
  query checkUser($username: String!) {
    userByUsername(username: $username) {
        username
    }
}`



export default function RegisterPage() {
  const [openPwdAlert, setOpenPwdAlert] = useState(false)
  const [openUsernameAlert, setOpenUsernameAlert] = useState(false)
  const [openRegisterAlert, setOpenRegisterAlert] = useState(false)

  let navigate = useNavigate();

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  // GraphQL
  const [registerAccount] = useMutation(ADD_USER, {
    onCompleted: (data) => {setOpenRegisterAlert(true)},
    onError: (err)=> {alert(`${err}`)},
    variables: {
        username,
        password
    }
  })

  const [checkUserName] = useLazyQuery(CHECK_USER, {
    onCompleted: (data) => {examineUsername(data.userByUsername === null ? null : data.userByUsername.username)},
    variables: {
      username,
    }
  })

  // Other services
  const examineUsername = (examinedUsername) => {
      if (examinedUsername === null) {
        registerAccount()
      }
      else {
        setOpenUsernameAlert(true)
      }
  }

  // Submit Form
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let curUserName = formData.get('username');
    let curPwd = formData.get('password');
    let curRepeatPwd = formData.get('repeat_password');
    if (curPwd !== curRepeatPwd) {
      setOpenPwdAlert(true)
    }
    else {
      setUsername(curUserName)
      setPassword(curPwd)
      checkUserName()
    }
  };

  // Alerts
  const handleUsernameClose = () => {
    setOpenUsernameAlert(false)
  }

  const handlePwdClose = () => {
    setOpenPwdAlert(false)
  }

  const handleRegisterClose = (finalUsername) => {
    setOpenRegisterAlert(false)
    navigate("/login")
  }


  return (
    <Box className="LoginPage">
        <Snackbar open={openPwdAlert} onClose={handlePwdClose} autoHideDuration={2500} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <Alert  severity="error" onClose={handlePwdClose} sx={{ width: '100%' }}>
            Passwords don't match
          </Alert>
        </Snackbar>
        <Snackbar open={openUsernameAlert} onClose={handleUsernameClose} autoHideDuration={2500} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <Alert  severity="error" onClose={handleUsernameClose} sx={{ width: '100%' }}>
            Username already exists
          </Alert>
        </Snackbar>
        <Snackbar open={openRegisterAlert} onClose={handleRegisterClose} autoHideDuration={2500} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
          <Alert  severity="success" onClose={handleRegisterClose} sx={{ width: '100%' }}>
            Register Successful
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
        
          </Box>
{/* 
          <Typography component="h1" variant="h3" color="#9966ff"  marginTop="20px">
            Welcome to
          </Typography> */}
          <Typography component="h1" variant="h4" color="#42a5f5 " marginTop="30px" marginBottom="20px">
            Register An Account
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
            <TextField
             sx={{input: {color: "#42a5f5 "}}}
             InputLabelProps={{className: "textfield__input"}}
              margin="normal"
              required
              fullWidth
              name="repeat_password"
              label="Repeat Password"
              type="password"
              id="repeat_password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item marginBottom="20px">
                <Link href="/login" variant="b5" color={"#ffffff"} >
                  {"Back to Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    </Box>
  );
}