const { updateVotes } = require("../models/newVoteCount.models.js")

exports.newVotes = (request, response, next) => {    
  const { article_id } = request.params
  updateVotes(request.body, article_id)
  .then(( updatedArticle ) => {
    response.status(201).send({ updatedArticle })
  })
  .catch((err) => {
    next(err)
  })
}