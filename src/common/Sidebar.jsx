import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Sidebar = () => {
    return (
        <Box sx={{backgroundColor: "rgba(0,0,0,0)" ,color: "#fff"}}>
            <Grid  container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Box marginTop="80px">
                    <img
                        alt="profile-user"
                        width="120px"
                        height="120px"
                        src={"/user-icons/elon-musk.png"}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                </Box>
                <Typography component="h4" variant="h5" color="white " marginTop="30px" marginBottom="20px">
                    Welcome
                </Typography>
                <Typography component="h4" variant="h4" color="white " marginBottom="30px">
                    Frankson
                </Typography>
            </Grid>
        </Box>
    )
}

export default Sidebar;