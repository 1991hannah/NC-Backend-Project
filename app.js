const express = require('express')
const app = express()
const endPointData = require("./endpoints.json")

const { getAllTopics } = require('./controllers/topics.controllers.js')
const {handleCustomErrors} = require('./errors/errors.js')


app.get('/api/topics', getAllTopics);

app.get('/api', (req, res) => {
    res.status(200).send(endPointData)
})

app.use(handleCustomErrors);

app.all("*", (_, res) => {
    res.status(404).send({status:404, msg: "Path not found"})
})


module.exports = app