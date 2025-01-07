const Result = require('../utils/Result');

const errorHandler = (err, req, res, next) => {
    let result = Result.failure(err.message);

    res.status(500)
        .json(result);
}

module.exports = errorHandler;