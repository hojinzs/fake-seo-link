import {useState} from "react";

const useMetadata = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [siteName, setSiteName] = useState('')
    const [siteURL, setSiteURL] = useState('https://news.lenscat.in')
    const [imageURL, setImageURL] = useState('http://placehold.it/300x200')

    return {
        title, setTitle,
        description, setDescription,
        siteName, setSiteName,
        siteURL, setSiteURL,
        imageURL, setImageURL,
    }
}

export { useMetadata }
