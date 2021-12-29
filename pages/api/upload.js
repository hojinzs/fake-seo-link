import Storage from "../../middlewares/storage";

export default async function handler(req, res) {

    const { method } = req

    switch (method) {
        case 'POST':

            const {filename} = req.query

            const URL = await Storage.createPresignedPost(filename)
            console.log("URL => ", URL)
            res.status(200).json(URL)
            break;
        default:
            res.status(404).body('cannot find endpoint')
            break;
    }
}
