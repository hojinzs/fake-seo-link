import {PositionCentered} from "../styled/positions";
import {Box, Button, Popover, Stack, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";
import ArticleCard from "../../../components/ArticleCard";
import copy from "copy-to-clipboard";

const getArticle = (id) => {
    return axios.get(`/api/articles/${id}`)
        .then(res => {
            return res.data
        })
}

const modalStyle = {
    maxWidth: "460px",
    padding: "10px",
    backgroundColor: "white"
}

const ArticleShareModal = ({ articleId }) => {

    const [article, setArticle] = useState()
    const [shareURL, setShareURL] = useState()

    const makeURL = (articleId) => `${window.location.protocol}//${window.location.host}/articles/${articleId}`

    const copyShareURL = () => {
        copy(shareURL)
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        copyShareURL()
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        getArticle(articleId)
            .then(data => {
                console.log("data => ", data)
                setArticle(data)
                setShareURL(makeURL(articleId))
            })

    }, [articleId])

    return (
        <PositionCentered>
            <Box sx={modalStyle}>
                <Stack spacing={4}>
                    <Typography variant="h3">
                        가짜 링크 공유 하기
                    </Typography>
                    <Box>
                        { article
                            ?(
                                <ArticleCard title={article.title}
                                             description={article.description}
                                             imageURL={article.imageURL}
                                />
                            )
                            :(
                                <>
                                    Before Render
                                </>
                            )
                        }
                    </Box>
                    <Box>
                        <TextField value={shareURL} disabled />
                        <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                            URL 복사
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                        </Popover>
                    </Box>
                </Stack>
            </Box>
        </PositionCentered>
    )
}

export default ArticleShareModal
