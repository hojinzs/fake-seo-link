import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    siteName: {
        type: String,
        required: true,
    },
    siteURL: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true
    },
    hit: {
        type: "Number",
    },
})

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema, 'articles')
