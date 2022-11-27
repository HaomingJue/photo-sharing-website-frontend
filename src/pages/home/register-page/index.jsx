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





export default function RegisterPage() {

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
              name="repeat-password"
              label="Repeat Password"
              type="password"
              id="password"
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