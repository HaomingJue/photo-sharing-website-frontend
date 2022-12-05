import { Box} from "@mui/material"
import ImageCard from "../../../components/ImageCard"

export const AllPhotosPage = () => {
    return  (
        <Box >
        <ImageCard image={"/backgrounds/dark-1.png"}/>
        <ImageCard image={"/backgrounds/harbour.png"}/>
        <ImageCard image={"/backgrounds/lake.png"}/>
        <ImageCard image={"/backgrounds/meteor.png"}/>
        <ImageCard image={"/backgrounds/valley.png"}/>
    </Box>
    )
}