const express = require('express')
const app = express()

const { getAllTopics } = require('./controllers/topics.controllers.js')
const {handleCustomErrors} = require('./errors/errors.js')


app.get('/api/topics', getAllTopics);

app.use(handleCustomErrors);

app.all("*", (_, res) => {
    res.status(404).send({status:404, msg: "Path not found"})
})


module.exports = app