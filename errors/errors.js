exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Invalid ID" });
    }
    if (err.code === "23502") {
        res.status(400).send({ msg: "Request is missing key information"})
    }
    else next(err);
    if (err.code === "23503") {
        res.status(400).send({ msg: "One or more inputs incorrectly formatted in request"})
    }
    else next(err);
}

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }
    else next(err)
}

