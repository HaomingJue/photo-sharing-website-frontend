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





export default function SignIn() {

  let navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    navigate("/home")
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
          <img  src="/harbour.png" alt='unavilable' width="200px" height="150px" style={{ cursor: "pointer", borderRadius: "90%", opacity: "0.75"}}></img>
          </Box>
{/* 
          <Typography component="h1" variant="h3" color="#9966ff"  marginTop="20px">
            Welcome to
          </Typography> */}
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
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
                <Link href="#" variant="b5" color={"#ffffff"} >
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