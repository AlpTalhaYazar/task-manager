const { StatusCodes } = require('http-status-codes');
const Result = require('../utils/Result');

const NotFound = (req, res) => {
    const result = Result.failure('Route does not exist');

    res.status(StatusCodes.NOT_FOUND)
        .json(result);
}

module.exports = NotFound;