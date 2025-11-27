const express = require('express')

const app = express()

const PORT = process.env.PORT || 5000;

const cors = require('cors')

const mongoose = require('mongoose')
// const { MONGOURI } = require('./keys')

require("dotenv").config();
const MONGOURI = process.env.MONGOURI;

require('./ProjectDetails/data')
app.use(cors())
app.use(express.json())
app.use(require('./routes/project'))

mongoose.connect(MONGOURI)

mongoose.connection.on('connected', () => {
    console.log("connected to mongoose")
})

mongoose.connection.on('error', (err) => {
    console.log("Error: ", err)
})

app.get("/", (req, res) => {
    res.send("hello world")
})

app.listen(PORT, () => {
    console.log("server running on port", PORT)
})