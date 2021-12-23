import {Card, CardContent, CardMedia, Typography, Stack, CardActions} from "@mui/material";
import { grey } from "@mui/material/colors";

const ArticleCardStyle = {
    color: grey[700]
}

const ArticleSiteInfo = {
    color: grey[500],
    fontSize: "0.7rem"
}

const ArticleCard = ({imageURL, title, description, siteName, siteURL}) => {
    return (
        <Card sx={ArticleCardStyle}>
            <CardMedia component="img" src={imageURL} />
            <CardContent>
                <Stack>
                    <Typography variant="h5">
                        { title || '{ 제목 }' }
                    </Typography>
                    <Typography>
                        { description || '{ 내용 설명. 최대 200자 까지 표시 }' }
                    </Typography>
                </Stack>                
            </CardContent>
            <CardActions>
                <Stack direction="column">
                    <Typography sx={ArticleSiteInfo}>
                        { siteName || '{ 웹사이트 이름 }' }
                    </Typography>
                    <Typography sx={ArticleSiteInfo}>
                        { siteURL || '{ 웹사이트 주소 }' }
                    </Typography>
                </Stack>                    
            </CardActions>
        </Card>
    )
}

export default ArticleCard
