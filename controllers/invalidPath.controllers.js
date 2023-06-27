exports.invalidPath = (err, request, response) => {
    if(err) {
        next(err)
    }
}