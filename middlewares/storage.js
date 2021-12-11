import AWS from 'aws-sdk'
import {createRandomHash} from "../utils/hash";
import {getFileExtension} from "../utils/files";

class Storage {

    constructor() {
        this.storage = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
            endpoint: process.env.AWS_S3_ENDPOINT,
            s3ForcePathStyle: true,
            signatureVersion: "v4",
        })

        this.bucket = process.env.AWS_S3_BUCKET
    }

    putObject(body) {

        const key = createRandomHash()

        this.storage.putObject({
            Bucket: this.bucket,
            Key: key
        })
    }

    async createPresignedPost(fileName) {

        const hash = await createRandomHash()
        const ext = getFileExtension(fileName)

        return this.storage.createPresignedPost({
            Bucket: this.bucket,
            Fields: {
                key: `${hash}.${ext}`
            },
            Expires: 60,
            Conditions: [
                ['content-length-range', 0, 1048576],
            ]
        });
    }

    static init() {

        if(typeof global.storage === 'undefined') {
            global.storage = new Storage()
        }

        return global.storage
    }
}

export default Storage.init()
