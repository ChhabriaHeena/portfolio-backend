const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    paragraph: {
        type: String,
        required: false,
        default: ""
    },
    tech: {
        type: [String],
        required: true
    },
    paragraph2: {
        type: String,
        required: false,
        default: ""
    },
    link: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{ strict: false }
)

mongoose.model("Data", dataSchema)