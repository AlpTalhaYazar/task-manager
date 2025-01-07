import { StatusCodes } from 'http-status-codes';
import { Result } from '../utils/Result.js';

const notFoundMiddleware = (req, res) => {
    const result = Result.failure('Route does not exist');

    res.status(StatusCodes.NOT_FOUND)
        .json(result);
}

export { notFoundMiddleware };