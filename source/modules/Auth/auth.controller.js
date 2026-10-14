import authService from './auth.service.js';
import AsyncHandler from '../../utils/AsyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import jwt from '../../utils/jsonWebToken.js';



const createAuth = AsyncHandler(async (req,res,next)=>{
    const authData = (await authService.createAuth(req.body)).toObject();

    delete authData.password; // Remove password from the response for security

    // set cookie
    const token = jwt.generateToken({ id: authData._id, username: authData.username }, '1d');
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict', // Adjust based on your requirements
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
   
    return ApiResponse({
        res,
        statusCode: 200,
        success: true,
        message: 'Auth User created successfully',
        data: { authData, token }
    });
})

const getAuth = AsyncHandler(async (req,res,next)=>{
    const authData = (await authService.getAuth(req.user)).toObject();

    delete authData.password; // Remove password from the response for security

    return ApiResponse({
        res,
        statusCode: 200,
        success: true,
        message: 'Auth User fetched successfully',
        data: { authData }
    });
});

const authLogin = AsyncHandler(async (req,res,next)=>{
    const authData = (await authService.authLogin(req.body)).toObject();
 
    
    delete authData.password;

    
    
    // set cookie
    const token = jwt.generateToken({ id: authData._id, username: authData.username }, '1d');
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict', // Adjust based on your requirements
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    return ApiResponse({
        res,
        statusCode: 200,
        success: true,
        message: 'Auth User logged in successfully',
        data: { authData, token }
    });
});

const authLogout = AsyncHandler(async (req,res,next)=>{
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict', // Adjust based on your requirements
    });

    return ApiResponse({
        res,
        statusCode: 200,
        success: true,
        message: 'Auth User logged out successfully',
        data: {}
    });
});

const authVerify = AsyncHandler(async (req,res,next)=>{
   
    const authData = (await authService.authVerify(req)).toObject();

    delete authData.password; // Remove password from the response for security

    return ApiResponse({
        res,
        statusCode: 200,
        success: true,
        message: 'Auth User verified successfully',
        data: { authData }
    });
});

const authSendVerifyEmail = AsyncHandler(async (req,res,next)=>{
    const authData = (await authService.sendVerifyEmail(req)).toObject();

    delete authData.password; // Remove password from the response for security

    return ApiResponse({
        res,
        statusCode: 200,
        success: true,
        message: 'Verification email sent successfully',
        data: { authData }
    });
});




export default {
    createAuth,
    getAuth,
    authLogin,
    authLogout,
    authVerify,
    authSendVerifyEmail
}
