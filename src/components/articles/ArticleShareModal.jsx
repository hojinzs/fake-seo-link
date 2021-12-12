import {PositionCentered} from "../styled/positions";
import {Box} from "@mui/material";
import axios from "axios";
import {useState} from "react";

const getArticle = (id) => {
    return axios.get(`/api/articles/${id}`)
        .then(res => {
            return res.data
        })
}

function ArticleShareModal(props) {

    console.log("article share props => ", props)

    const [article, setArticle] = useState()

    return (
        <PositionCentered>
            <Box>
                TEASETASET
            </Box>
        </PositionCentered>
    )
}

export default ArticleShareModal
