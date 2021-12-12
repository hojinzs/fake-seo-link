import {Card, CardContent, CardMedia, TextField, Typography, Input, IconButton, Button} from "@mui/material";
import MainSubColumn from "../../src/components/layouts/MainSubColumn";
import {useMetadata} from "../../libs/metadata";
import {PhotoCamera} from "@mui/icons-material";
import axios from "axios";
import {readFile} from "../../utils/readFile";
import {createFormDataFromObject, getPresingedPostURL} from "../../src/libs/fileupload";
import {useState} from "react";
import {useRouter} from "next/router";
import {modalController} from "../../src/libs/modalPresenter";
import ArticleShareModal from "../../src/components/articles/ArticleShareModal";

const CreateFakeLink = () => {

    const router = useRouter()

    const {
        title,
        setTitle,
        description,
        setDescription,
        siteName,
        setSiteName,
        siteURL,
        setSiteURL,
        imageURL,
        setImageURL,
    } = useMetadata()

    const [uploadedFile, setUploadedFile] = useState()

    const onClickSave = async () => {

        const uploadedURL = await fileUpload(uploadedFile)

        return axios.post('/api/articles', {
            title,
            description,
            siteName,
            siteURL,
            imageURL: uploadedURL.url,
        })
            .then(res => {
                router.push(`/articles/${res.data.id}`)
            })
    }

    const onChangePhoto = async (imgFiles) => {

        const file = await readFile(imgFiles[0])
        setImageURL(file.toString())
        setUploadedFile(imgFiles[0])
    }

    const fileUpload = async (file) => {
        try {

            console.log('file => ', file)

            const { url, fields } = await getPresingedPostURL(file.name)
            const formData = createFormDataFromObject(fields)
            formData.append('file', file)
            await axios.post(url, formData)

            return {
                url: `${url}/${fields.key}`
            }

        }
        catch (e) {
            throw new Error('file-upload fail')
        }
    }

    const showModalTest = () => {
        modalController(ArticleShareModal)
    }

    return (
        <>
            <MainSubColumn
                mainSection={
                    <>
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={e => onChangePhoto(e.target.files)}/>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                        <TextField fullWidth id="title" label="제목" value={title} onChange={e => setTitle(e.target.value)} margin="normal" />
                        <TextField fullWidth id="description " label="설명" value={description} onChange={e => setDescription(e.target.value)} margin="normal" multiline rows={5} />
                        <TextField fullWidth id="siteName" label="사이트 이름" value={siteName} onChange={e => setSiteName(e.target.value)} margin="normal" />
                        <TextField fullWidth id="siteURL" label="사이트 주소" value={siteURL} onChange={e => setSiteURL(e.target.value)} margin="normal" />
                        <Button onClick={onClickSave}>등록</Button>
                        <Button onClick={showModalTest}>모달 테스트</Button>
                    </>
                }
                subSection={
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
                }
            />
        </>
    )
}

export default CreateFakeLink
