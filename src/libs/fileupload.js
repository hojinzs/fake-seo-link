import axios from "axios";

const getPresingedPostURL = async (filename) => {
    const res = await axios.post(`/api/upload?filename=${filename}`)
    const { url, fields } = res.data

    return {
        url,
        fields
    }
}

const createFormDataFromObject = (object) => {
    const formData = new FormData()
    Object.entries(object).forEach(([key, value]) => {
        formData.append(key, value)
    })
    return formData
}

const getKeyAfterUpload = async (file) => {

    const { url, fields } = await getPresingedPostURL(file.name)
    const formData = createFormDataFromObject(fields)
    formData.append('file', file)
    await axios.post(url, formData)

    return {
        url: `${url}/${fields.key}`,
        key: fields.key
    }
}

export {
    getPresingedPostURL,
    createFormDataFromObject,
    getKeyAfterUpload
}
