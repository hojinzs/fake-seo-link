import {Card, CardContent, CardMedia, Typography} from "@mui/material";

const ArticleCard = ({imageURL, title, description}) => {
    return (
        <Card>
            <CardMedia component="img" src={imageURL} />
            <CardContent>
                <Typography variant="h5">
                    { title }
                </Typography>
                <Typography variant="p">
                    { description }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ArticleCard
