const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Data = mongoose.model('Data')

router.get("/", (req, res) => {
    res.send("hello from project js")
})

router.post("/projectdata", (req, res) => {
    const { image, title, paragraph, tech, paragraph2, link, github } = req.body
    if (!image || !title || !tech || !link || !github) {
        return res.status(422).json({ error: "Please Add Image/Title/Tech/Live Link/Source Code" })
    }

    Data.findOne({ $or: [{ title }, { link }, { github }] })
        .then((existingData) => {
            if (existingData) {
                return res.status(404).json({ error: `Project already exists` })
            }
            const data = new Data(req.body)

            data.save()
                .then((dta) => {
                    res.json({ message: "data saved", dta })
                })
                .catch((error) => {
                    res.status(500).json({ error: "Server error", details: error })
                })
        })
        .catch((error) => {
            res.status(500).json({ error: "Server error", details: error })
        })
})

router.get("/projectdata", (req, res) => {

    Data.find()
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.error("Error fetching data: ", error)
            res.status(500).json({ error: "error finding data" })
        })

})

router.get("/projectdata/:id", (req, res) => {

    const id = req.params.id
    if (id) {

        Data.findById(id)
            .then((data) => {
                res.json(data)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error)
                res.status(500).json({ error: "error finding data" })
            })
    }

})

router.post("/projectdata/:id", (req, res) => {
    const { image, title, paragraph, tech, paragraph2, link, github, _id } = req.body
    if (!image || !title || !tech || !link || !github) {
        return res.status(422).json({ error: "Please Add Image/Title/Tech/Live Link/Source Code" })
    }

    Data.findByIdAndUpdate(_id, req.body, { new: true })
        .then((updatingData) => {
            if (!updatingData) {
                return res.status(400).json({ error: "Project not found" })
            }
            res.json({ message: "Data Updated", updatingData })
        })
        .catch((error) => {
            res.status(500).json({ error: "Server error", details: error })
        })
})

router.delete("/projectdata/:id", (req, res) => {
    const id = req.params.id

    if (!id) {
        return res.status(400).json({ error: "ID is required" });
    }

    Data.findByIdAndDelete(id)
        .then((deleteData) => {
            if (!deleteData) {
                return res.send(400).json({ error: "Project Not Found" });
            }
            res.json({ message: "Project Deleted Successfully!", deleteData });
        })
        .catch((error) => {
            console.error("Error deleteing Project:", error);
            res.status(500).json({error: "Server Error", details: error})
        })

})

module.exports = router;