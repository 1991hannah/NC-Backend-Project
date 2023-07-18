const db = require("../db/connection.js")

exports.updateVotes = (newVote, article_id) => {
    const { inc_votes } = newVote

    //     put promise.reject below
        return db.query(    
            `UPDATE articles
            SET votes = votes + $1
            WHERE article_id = $2
            RETURNING *;
            `,
            [inc_votes, article_id])
            .then(({ rows }) => rows[0])
        }
//         )
// }