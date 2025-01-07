const StatusCodes = require('http-status-codes');
const Result = require('../utils/Result');

const errorHandler = (err, req, res, next) => {
    let result = Result.failure(err.message);

    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(result);
}

module.exports = errorHandler;