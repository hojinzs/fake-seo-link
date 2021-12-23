import React from "react";
import {useState} from "react";

import {Box, Typography, Input, IconButton, Button} from "@mui/material";
import MainSubColumn from "../../src/components/layouts/MainSubColumn";
import {PhotoCamera} from "@mui/icons-material";
import axios from "axios";
import {getKeyAfterUpload} from "../../src/libs/fileupload";
import {modalController} from "../../src/libs/modalPresenter";
import ArticleShareModal from "../../src/components/articles/ArticleShareModal";
import ArticleCard from "../../components/ArticleCard";
import { grey } from "@mui/material/colors"
import { useArticleForm } from "../../src/libs/articleForm";
import ArticleForm from "../../components/ArticleForm";

const cardDescriptionText = {
    fontSize: "0.8rem",
    color: grey[600]
}

const CreateFakeLink = () => {

    /* Hooks */
    const [temponaryImageKey, setTemponaryImageKey] = useState()
    const form = useArticleForm({
        initialValues: {
            title: "",
            description: "",
            imageURL: "http://placehold.it/300x200",
            imageKey: "",
            siteName: "낚시 링크 생성기",
            siteURL: "https://news.lenscat.in",
        },
        onSubmit: (values) => postArticle(values)
    })

    const onChangePhoto = async (imgFiles) => {
        const { url, key } = await getKeyAfterUpload(imgFiles[0])
        form.setFieldValue('imageURL', url)
        form.setFieldValue('imageKey', key)
    }

    const showModalTest = () => {
        const articleId = "61b4ed37d5d962d9ab995f18";
        modalController(ArticleShareModal, { articleId })
    }

    const postArticle = async (values) => {
        const response = await axios.post('/api/articles', {...values})
        modalController(ArticleShareModal, { articleId: response.data.id })
    }

    return (
        <MainSubColumn
            mainSection={
                <>
                    <Box>
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={e => onChangePhoto(e.target.files)}/>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </Box>                    
                    <ArticleForm form={form} />
                    <Button onClick={showModalTest}>모달 테스트</Button>
                </>
            }
            subSection={
                <>
                    <Typography sx={cardDescriptionText}>
                        미리보기
                    </Typography>                                   
                    <ArticleCard title={form.values.title}
                                    description={form.values.description}
                                    imageURL={form.values.imageURL}
                                    siteName={form.values.siteName}
                                    siteURL={form.values.siteURL}
                    />
                    <Typography sx={cardDescriptionText}>
                        메신저 등에 공유하면 위와 같이 표시됩니다.
                    </Typography>                    
                </>
            }
        />
    )
}

export default CreateFakeLink
