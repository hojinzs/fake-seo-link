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

    async createPresignedPost(fileName, directory = 'tmp') {

        const hash = await createRandomHash()
        const ext = getFileExtension(fileName)

        return this.storage.createPresignedPost({
            Bucket: this.bucket,
            Fields: {
                key: `${directory}/${hash}.${ext}`
            },
            Expires: 60,
            Conditions: [
                ['content-length-range', 0, 1048576],
            ]
        });
    }

    async moveFile(sourcefileKey, dir = null) {

        const hash = await createRandomHash()
        const ext = getFileExtension(sourcefileKey)
        const key = `${dir === null ? '' : '/'+dir}/${hash}.${ext}`

        return new Promise((resolve, reject) => {
            
            this.storage.copyObject({
                Key: key,
                Bucket: this.bucket,
                CopySource: `/${this.bucket}/${sourcefileKey}`
            }, (result) => {

                if(result) {
                    reject({
                        result: result
                    })
                } else {
                    resolve({
                        key: key,
                        url: `https://${this.storage.endpoint.hostname}${key}`,
                        result: result
                    })
                }
            })

        })
    }

    static init() {

        if(typeof global.storage === 'undefined') {
            global.storage = new Storage()
        }

        return global.storage
    }
}

export default Storage.init()
