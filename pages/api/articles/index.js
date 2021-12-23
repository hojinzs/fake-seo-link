import {createNewArticle} from "../../../libs/Article";
import storage from "../../../middlewares/storage";

export default async function handler(req, res) {

    const { method } = req

    switch (method) {
        case "POST":
            const { body: payload } = req

            if(payload.imageKey) {
                try {
                    const { url } = await storage.moveFile(payload.imageKey)
                    payload.imageURL = url
                }
                catch(e) {
                    res.status(400).json({message: 'file copy fail'})
                }
            }

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
                res.status(400).json({message: 'database insert fail'})
            }
            break;

        default:
            res.status(200).json({ name: 'John Doe' })
            break;
    }
}

message: "Article validation failed: imageURL: Cast to string failed for value \"{\n  key: '6797ced68d71f3431fa6ce30d82d4842.jpg',\n  result: NoSuchKey: The specified key does not exist.\n      at Request.extractError (C:\\Users\\stevelee\\Projects\\fake-seo-link\\node_modules\\aws-sdk\\lib\\services\\s3.js:710:35)\n      at Request.callListeners (C:\\Users\\stevelee\\Projects\\fake-seo-link\\node_modules\\aws-sdk\\lib\\sequential_executor.js:106:20)\n      at Request.emit (C:\\Users\\stevelee\\Projects\\fake-seo-link\\node_modules\\aws-sdk\\lib\\sequential_executor.js:78:10)\n      at Request.emit (C:\\Users\\stevelee\\Projects\\fake-seo-link\\node_modules\\aws-sdk\\lib\\request.js:686:14)\n      at Request.transition (C:\\Users\\stevelee\\Projects\\fake-seo-link\\node_modules\\aws-sdk\\lib\\request.js:22:10)\n      at AcceptorStateMachine.runTo (C:\\Users\\stevelee\\Projects\\fake-seo-link\\node_modules\\aws-sdk\\lib\\state_machine.js:14:12)\n      at C:\\Users\\stevelee\\Projects\\fake-seo-link\\node_modules\\aws-sdk\\lib\\state_machine.js:26:10\n      at Request.<anonymous> (C:\\Users\\stevelee\\Projects\\fake-seo-link\\node_modules\\aws-sdk\\lib\\request.js:38:9)\n      at Request.<anonymous> (C:\\Users\\stevelee\\Projects\\fake-seo-link\\node_modules\\aws-sdk\\lib\\request.js:688:12)\n      at Request.callListeners (C:\\Users\\stevelee\\Projects\\fake-seo-link\\node_modules\\aws-sdk\\lib\\sequential_executor.js:116:18) {\n    code: 'NoSuchKey',\n    region: null,\n    time: 2021-12-23T09:29:51.291Z,\n    requestId: '16C358504EDAF7A3',\n    extendedRequestId: undefined,\n    cfId: undefined,\n    statusCode: 404,\n    retryable: false,\n    retryDelay: 29.849341901756322\n  }\n}\" (type Object) at path \"imageURL\""