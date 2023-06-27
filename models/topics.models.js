const db = require("../db/connection.js")

exports.selectAllTopics = () => {
    return db.query(`SELECT * FROM topics;`)
    .then((topics) => {
        console.log(topics.rows)
        return topics.rows;
    })
}