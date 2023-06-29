const db = require("../db/connection.js")
const { forEach } = require("../db/data/test-data/articles.js")

exports.selectAllArticles = () => {
    return db.query(`SELECT articles.*, COUNT(comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC`)
    .then((response) => {
        const articleResponse = response.rows
        const articles = [];
        articleResponse.forEach((article) => {
            delete article.body;
            articles.push(article);
        })
        return articles;
    })
}