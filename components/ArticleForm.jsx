import { TextField, Button } from "@mui/material"
import { FormikProvider } from "formik";

const ArticleForm = ({form}) => {

    return (
        <FormikProvider value={form}>
            <form onSubmit={form.handleSubmit}>
                <TextField fullWidth margin="normal"
                    id="title" label="제목" name="title"
                    value={form.values.title} 
                    onChange={form.handleChange}
                />
                <TextField fullWidth margin="normal" multiline rows={5}
                    id="description" name="description" label="설명" 
                    value={form.values.description}
                    onChange={form.handleChange}
                />
                <TextField fullWidth margin="normal"
                    id="siteName" name="siteName" label="사이트 이름"
                    value={form.values.siteName}
                    onChange={form.handleChange}
                />
                <TextField fullWidth 
                    id="siteURL" name="siteURL" label="사이트 주소" margin="normal"
                    value={form.values.siteURL}
                    onChange={form.handleChange}
                />
                <Button type="submit">등록</Button>
            </form>
        </FormikProvider>
    )
}

export default ArticleForm