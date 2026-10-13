import jwt from 'jsonwebtoken';
import env from '../config/env.js';

const secret = env.JSON_WEB_TOKEN_SECRET ;

const generateToken = (payload, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export default  { generateToken, verifyToken };