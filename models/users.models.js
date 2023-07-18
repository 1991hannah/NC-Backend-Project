const db = require("../db/connection.js")

exports.selectAllUsers = () => {
    return db.query(`SELECT * FROM users;`)
    .then((response) => {
        return response.rows;
    })
}