const { selectArticleComments } = require("../models/articleComments.models.js")

exports.getArticleComments = (request, response, next) => {
  const { article_id } = request.params
  selectArticleComments(article_id)
    .then((comments) => {
    response.status(200).send({ comments })
  })
  .catch((err) => {
    next(err)
  })
}

