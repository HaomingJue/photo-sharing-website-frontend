import  Topbar  from "../../common/Topbar";
import  Sidebar from "../../common/Sidebar";
import { Box, Paper } from "@mui/material";
import "./home-page.css";
import ImageCard from "../../components/ImageCard";
import { Container } from "@mui/system";



const HomePage = () => {
        return (
          
          <Box className="HomePage">
          <Container maxWidth="md">
              <Box  marginTop="20px">
                <Topbar/>
              </Box>

              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows={window.innerHeight - "120"}
                borderBottom="20px"

              >
                <Box gridColumn="span 4" className="MainContent"  gridRow="span 1"   direction="column"
                    sx={{backgroundColor: "rgba(0,0,0,.65)" ,color: "#fff"}}>
                      
                    <Sidebar />
                </Box>
                <Box gridColumn="span 8" className="MainContent"  overflow="auto" gridRow="span 1"
                    sx={{backgroundColor: "rgba(0,0,0,.35)" ,color: "#fff",
                    '&::-webkit-scrollbar': {
                      width: '1em'
                    },
                    '&::-webkit-scrollbar-track': {
                      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(0,0,0,.65)',
                      outline: "1 px solid black"
                    } }}>

                  
                      <Paper style={{maxHeight: 200, overflow: 'auto'}}></Paper>
                      <Box maxHeight="75" marginBottom="30px" overflow="auto">
                        <ImageCard image={"/backgrounds/dark-1.png"}/>
                        <ImageCard image={"/backgrounds/harbour.png"}/>
                        <ImageCard image={"/backgrounds/lake.png"}/>
                        <ImageCard image={"/backgrounds/meteor.png"}/>
                        <ImageCard image={"/backgrounds/valley.png"}/>
                      </Box>
                      <Paper/>
                </Box>

              </Box>
           
          </Container>
          </Box>
        
        );
      }

export default HomePage;