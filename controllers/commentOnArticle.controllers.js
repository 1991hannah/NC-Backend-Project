const { insertComment } = require("../models/commentOnArticle.models.js")

exports.postComment = (request, response, next) => {
    const { article_id } = request.params
    insertComment(request.body, article_id)
    .then((comment) => {
        response.status(201).send({ comment })
    })
    .catch((err) => {
        next(err)
    })
}