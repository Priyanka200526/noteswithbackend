const express = require("express")
const friendmodule = require("./module/friend.module")
const cors = require("cors")

const app = express()
const path = require("path")
app.use(express.json())
app.use(express.static(path.join(__dirname, "../Public")))
app.use(cors())

app.post('/api/friend', async (req, res) => {
    const { name, city } = req.body
    const friend = await friendmodule.create({
        name, city
    })
    res.status(201).json({
        message: "friend data create successfully",
        friend
    })
})

app.get('/api/friend', async (req, res) => {
    const friend = await friendmodule.find()
    res.status(200).json({
        message: "friend fetched successfully",
        friend
    })
})

app.delete('/api/friend/:id', async (req, res) => {
    const id = req.params.id
    await friendmodule.findByIdAndDelete(id)
    res.status(200).json({
        message: "friend Delete successfully",
    })
})
app.patch('/api/friend/:id', async (req, res) => {
    const id = req.params.id
    const { name, city } = req.body
    await friendmodule.findByIdAndUpdate(id, { name, city })
    res.status(200).json({
        message: "friend Update successfully",
    })
})
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/index.html"))
})

module.exports = app