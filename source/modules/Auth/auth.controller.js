import authService from './auth.service.js';
import AsyncHandler from '../../utils/AsyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import jwt from '../../utils/jsonWebToken.js';



const createAuth = AsyncHandler(async (req,res,next)=>{
    const authData = await authService.createAuth(req.body);

    delete authData.password; // Remove password from the response for security

    // set cookie
    const token = jwt.generateToken({ id: authData._id, username: authData.username }, '1d');
   
    return ApiResponse({
        res,
        statusCode: 200,
        success: true,
        message: 'Auth User created successfully',
        data: { authData, token }
    });
})

export default {
    createAuth,
}