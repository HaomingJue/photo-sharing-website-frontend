import {  MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { clearLocal } from "../services/localStorage";


const Item = ({title, url}) => {
    let location = useLocation()
    console.log(location.pathname)
    return (
        <MenuItem>
            <Typography variant="h5">
                <Link to={url} style={{textDecoration: 'none', color: location.pathname === url ? "#bf80ff" : "#ffffff"}}> 
                    {title}
                </Link>
            </Typography>
        </MenuItem>
    )
} 


const Topbar = () => {

    return (
    <Box sx={{ backgroundColor: "rgba(0,0,0,.5)" ,color: "#fff" }}>
        <Box display="flex" justifyContent="space-between" flex padding={2} margin={"0 50px 0 50px"}>
                <Box>
                    <Item 
                        title="All Photos"
                        url="/home/all-photos"
                    />
                </Box>
                <Box>
                    <Item 
                        title="My Space"
                        url="/home/my-space"
                    />
                </Box>
                <Box>
                    <Item 
                        title="Favorites"
                        url="/home/favorites"
                    />
                </Box>
                <Box>
                    <Item 
                        title="Upload"
                        url="/home/upload"
                    />
                </Box>
                <Box>
                    <MenuItem>
                        <Typography variant="h5">
                            <Link onClick={() => {clearLocal()}} to={"/login"} style={{textDecoration: 'none', color:"#ffffff"}}> 
                                Logout
                            </Link>
                        </Typography>
                    </MenuItem>
                </Box>
        </Box>

    </Box>

    )
}
export default Topbar;