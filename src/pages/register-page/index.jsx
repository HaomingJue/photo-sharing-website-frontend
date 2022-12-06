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

  let navigate = useNavigate();

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  // GraphQL
  const [registerAccount] = useMutation(ADD_USER, {
    onCompleted: (data) => {console.log("data", data);finishRegistration(data.addUser.username)},
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
        alert(`User ${examinedUsername} already exists`)
      }
  }

  const finishRegistration = (finalUsername) => {
    alert(`User ${finalUsername} is registered successfully`);
    navigate("/login")
  }

  // Submit Form
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let curUserName = formData.get('username');
    let curPwd = formData.get('password');
    let curRepeatPwd = formData.get('repeat_password');
    console.log(curUserName);
    console.log(curPwd);
    console.log(curRepeatPwd);
    if (curPwd !== curRepeatPwd) {
      alert("Passwords don't match")
    }
    else {
      setUsername(curUserName)
      setPassword(curPwd)
      checkUserName()
    }
  };


  return (
    <Box className="LoginPage">
 

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