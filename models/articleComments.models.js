const db = require("../db/connection.js")

exports.selectArticleComments = (article_id) => {
  return db
    .query(`SELECT *
            FROM comments
            WHERE article_id = $1
            ORDER BY created_at DESC`, [article_id])
        .then((response) => {
            const comments = response.rows;
            if(response.rows.length === 0 ) {
                return Promise.reject( { status: 404, msg: `No comments found for article_id: ${article_id}`})
            }
            return comments;
        })
}
