const db = require("../db/connection.js")

exports.selectArticleById = (article_id) => {
    return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then(( response ) => {
            const article = response.rows[0];
            if (response.rows.length === 0) {
                return Promise.reject( { status: 404, msg: `No article found for article_id: ${article_id}`})
            }
            return article;
        })
}
