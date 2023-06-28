const db = require("../db/connection.js")

exports.selectAllTopics = () => {
    return db.query(`SELECT * FROM topics;`)
    .then((response) => {
        return response.rows;
    })
}
