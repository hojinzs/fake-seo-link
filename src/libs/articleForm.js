import {useFormik} from 'formik';
import * as yup from "yup"

const useArticleForm = (props) => {

    const schema = yup.object({
        title: yup
            .string()
            .required(),
        description: yup
            .string()
            .required(),
        imageURL: yup
            .string()
            .url(),
        imageKey: yup
            .string(),
        siteName: yup
            .string(),
        siteURL: yup
            .string()
            .url(),
    })

    const form = useFormik({
        validationSchema: schema,
        ...props
    })

    return form
}

export { useArticleForm }