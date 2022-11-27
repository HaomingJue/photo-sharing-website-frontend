import { Link, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";



// or


const Topbar = () => {

    return (
    <Box sx={{ backgroundColor: "rgba(0,0,0,.5)" ,color: "#fff" }}>
        <Box display="flex" justifyContent="space-between" flex padding={2} margin={"0 50px 0 50px"}>
                <Box>
                    <MenuItem>
                        <Typography variant="h5">
                            <Link href="/login"  style={{textDecoration: 'none', color:"#ffffff"}}> 
                                Home
                            </Link>
                        </Typography>
                    </MenuItem>
                </Box>
                <Box>
                    <MenuItem>
                        <Typography variant="h5">
                            <Link href="/login"  style={{textDecoration: 'none', color:"#ffffff"}}> 
                                My Space
                            </Link>
                        </Typography>
                    </MenuItem>
                </Box>
                <Box>
                    <MenuItem>
                        <Typography variant="h5">
                            <Link href="/login"  style={{textDecoration: 'none', color:"#ffffff"}}> 
                                Favorites
                            </Link>
                        </Typography>
                    </MenuItem>
                </Box>
    
                <Box>
                    <MenuItem>
                        <Typography variant="h5">
                            <Link href="/login"  style={{textDecoration: 'none', color:"#ffffff"}}> 
                                Upload
                            </Link>
                        </Typography>
                    </MenuItem>
                </Box>
    
                <Box>
                    <MenuItem>
                        <Typography variant="h5">
                            <Link href="/login"  style={{textDecoration: 'none', color:"#ffffff"}}> 
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