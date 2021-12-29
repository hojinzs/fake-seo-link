import AWS from 'aws-sdk'
import {Storage as GCS} from "@google-cloud/storage"
import {createRandomHash} from "../utils/hash";
import {getFileExtension} from "../utils/files";

class Storage {

    constructor() {

        const driver = process.env.STORAGE_DRIVER

        switch (driver) {
            case 'S3':
                this.storage = new AWS.S3({
                    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
                    endpoint: process.env.AWS_S3_ENDPOINT,
                    s3ForcePathStyle: true,
                    signatureVersion: "v4",
                })
        
                this.bucket = process.env.AWS_S3_BUCKET
                break;
            case 'GCS':
                this.storage = new GCS({
                    projectId: process.env.GCP_PROJECT_ID,
                    keyFilename: process.env.GCP_PROJECT_KEY,
                })

                this.bucket = process.env.GCP_GCS_BUCKET
                break;
            default:
                throw new Error('storage driver in .env file is not valid')
        }
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

        const driver = process.env.STORAGE_DRIVER

        console.log("driver => ", driver)

        switch(driver){
            case 'S3':
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
            case 'GCS':
                console.log("presignde GCS")
                const [url] = await this.storage
                    .bucket(this.bucket)
                    .file(`${directory}/${hash}.${ext}`)
                    .getSignedUrl({
                        version: 'v4',
                        action: 'write',
                        expires: Date.now() + 15 * 60 * 1000,
                        contentType: 'application/octet-stream'
                    });
                return {
                    url: url,
                    fields: {
                        contentType: "application/octet-stream"
                    }
                };
            default:
                throw new Error('storage is un initialize')
        }
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
