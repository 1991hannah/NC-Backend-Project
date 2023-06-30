const db = require("../db/connection.js")

exports.insertComment = (newComment, article_id) => {
    const { body, username } = newComment
    return db.query(
        `INSERT INTO comments
        (body, author, article_id)
        VALUES
        ($1, $2, $3)
        RETURNING *;`,
        [body, username, article_id])
        .then(({ rows }) => rows[0])
}