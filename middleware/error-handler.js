import { StatusCodes } from 'http-status-codes';
import { Result } from '../utils/Result.js';

const errorHandlerMiddleware = (err, req, res, next) => {
    let result = Result.failure(err.message);

    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(result);
}

export { errorHandlerMiddleware };