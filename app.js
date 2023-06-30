const express = require('express')
const app = express()

app.use(express.json())

const endPointData = require("./endpoints.json");
const {getAllTopics} = require('./controllers/topics.controllers.js')
const {getArticleById} = require('./controllers/articleByID.controllers.js')
const {getAllArticles} = require('./controllers/articles.controllers.js')
const {getArticleComments} = require('./controllers/articleComments.controllers.js')
const {postComment} = require('./controllers/commentOnArticle.controllers.js')
const {handlePsqlErrors} = require('./errors/errors.js')
const {handleCustomErrors} = require('./errors/errors.js')


app.get('/api/topics', getAllTopics);

app.get('/api', (req, res) => {
    res.status(200).send(endPointData)
})

app.get(`/api/articles/:article_id`, getArticleById)

app.get(`/api/articles`, getAllArticles)

app.get('/api/articles/:article_id/comments', getArticleComments)

app.post('/api/articles/:article_id/comments', postComment)


app.all("*", (_, res) => {
    res.status(404).send({status:404, msg: "Path not found"})
})

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

module.exports = app