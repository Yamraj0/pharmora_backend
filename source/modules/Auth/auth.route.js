import express from 'express';
import authController from './auth.controller.js';
import authMiddleware from '../../middleware/AuthMiddleware.js';

const authRoute = express.Router();


// check auth user
authRoute.get('/',authMiddleware,authController.getAuth);

// create new auth user

authRoute.post('/register',authController.createAuth);


// login auth user

authRoute.post('/login',authController.authLogin);

// logout auth user
authRoute.post('/logout',authController.authLogout);

// verify auth user 

authRoute.post('/verify-email/:token',authMiddleware,authController.authVerify);

// send verify email link
authRoute.post('/send-verify-email',authMiddleware,authController.authSendVerifyEmail);


// send forget password verification code


// forget password


// reset password





export default authRoute;