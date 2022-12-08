import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getLocal } from "../services/localStorage";
import { colorMap } from "./colorMap";

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
                <Avatar sx={{ bgcolor: colorMap[getLocal().toUpperCase()[0]], width: 90, height: 90 }} aria-label="recipe" ra>
                    <Typography variant="h3">
                    {getLocal().toUpperCase()[0]}
                    </Typography>
                </Avatar>
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