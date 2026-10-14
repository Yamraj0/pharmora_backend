import AsyncHandler from '../utils/AsyncHandler.js';
import AppError from '../utils/AppError.js';
import jwt from '../utils/jsonWebToken.js';

const authMiddleware = AsyncHandler(async (req, res, next) => {
    const Token = req.cookies.authToken || req.headers.authorization?.split(' ')[1]; // Check for token in cookies or Authorization header

    console.log('Auth Token:', Token); // Debugging line

    if (!Token) {
        throw new AppError('Authentication token is missing', 401);
    }

    try {
        const decoded = jwt.verifyToken(Token);
        req.user = decoded; // Attach the decoded user info to the request object
        next();
    } catch (error) {
        throw new AppError('Invalid or expired authentication token', 401);
    }
});

export default authMiddleware;
