import {getArticleData, updateArticleCount} from "../../../libs/Article";

export default async function handler(req, res) {

    const { method } = req
    const { id: articleId } = req.query

    switch (method) {

        case 'GET':
            try {
                const article = await getArticleData(articleId)
                res.status(200).json(article)
            }
            catch (e) {
                res.status(400).json({message: e.message})
            }
            break;

        default:
            res.status(404)
            break;

    }
}
