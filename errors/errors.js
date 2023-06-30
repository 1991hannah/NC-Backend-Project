exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Invalid ID" });
    }
    if (err.code === "23502") {
        res.status(400).send({ msg: "Bad Request"})
    }
    if (err.code === "23503") {
        res.status(404).send({ msg: "Information not found" })
    }
    else next(err);

}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }
    else next(err)
}

