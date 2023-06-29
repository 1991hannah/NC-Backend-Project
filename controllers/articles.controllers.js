const { selectAllArticles } = require("../models/articles.models.js")

exports.getAllArticles = (request, response) => {
    selectAllArticles()
    .then((articles) => {
        response.status(200).send({ articles })
    })
}