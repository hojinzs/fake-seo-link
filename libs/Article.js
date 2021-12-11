import dbConnect from "../middlewares/database";
import Articles from "../models/articles";

const getArticleData = async (id) => {

    await dbConnect();
    const article = await Articles.findById(id).lean()

    return JSON.parse(JSON.stringify(article))
}

const updateArticleCount = async (id) => {

    try {
        await dbConnect();
        await Articles.updateOne({_id: id}, {$inc: {hit: 1}}).exec()
    }
    catch (e) {
    }
}

const createNewArticle = async (payload) => {

    await dbConnect();

    return Articles.create({
        title:          payload.title,
        description:    payload.description,
        siteName:       payload.siteName,
        siteURL:        payload.siteURL,
        imageURL:       payload.imageURL,
        hit:            0,
    })
}

export {
    getArticleData,
    updateArticleCount,
    createNewArticle,
}
