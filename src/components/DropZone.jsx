import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";



function ReactDropZone({ onDrop, open }) {
    const { getRootProps, isDragActive, acceptedFiles } =
      useDropzone({
        onDrop,
      });
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
    return (
        
      <Box >
            <Box {...getRootProps({ className: "dropzone" })}>
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    alignItems="center"
                    >
                    <Grid item >
                        <Box sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '50px',
                                borderWidth: 2,
                                borderRadius: 2,
                                borderColor: '#eeeeee',
                                borderStyle: 'dashed',
                                backgroundColor: "rgba(0,0,0,0.3)",
                                color: '#bdbdbd',
                                outline: 'none',
                                transition: 'border .24s ease-in-out'
                        }}>
                            {isDragActive ? (
                            <p className="dropzone-content">
                                Release to drop the files here
                            </p>
                            ) : (
                              <Box>
                                <p className="dropzone-content" color>
                                    Drag & drop some files here, or click to select files
                                </p>
                                <p className="dropzone-content" color>
                                    Please do not upload photo larger than 1MB
                                </p>
                              </Box>
                            )}
                        </Box>
                    </Grid>   
                    <Grid item >
                        <Button onClick={open} sx={{backgroundColor: "rgba(0,0,0,0.4)", color:"#6699ff"}}>
                        Click to select files
                        </Button>
                    </Grid>   
                    <aside>
                        <ul>{files}</ul>
                    </aside>

                </Grid> 
            </Box>

      </Box>
    );
  }
  export default ReactDropZone;