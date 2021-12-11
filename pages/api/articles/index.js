import {createNewArticle} from "../../../libs/Article";

export default async function handler(req, res) {

    const { method } = req

    switch (method) {
        case "POST":
            const { body: payload } = req
            try {
                const article = await createNewArticle({
                    title:          payload.title,
                    description:    payload.description,
                    siteName:       payload.siteName,
                    siteURL:        payload.siteURL,
                    imageURL:       payload.imageURL,
                })

                res.status(200).json({
                    id: article._id,
                    url: `//:${req.headers.host}/articles/${article._id}`,
                    ...article._doc
                })
            }
            catch (e) {
                res.status(400).json({message: e.message})
            }
            break;

        default:
            res.status(200).json({ name: 'John Doe' })
            break;
    }
}
