import express from 'express';
import authController from './auth.controller.js';

const authRoute = express.Router();


// create new auth user

authRoute.post('/',authController.createAuth);


// login auth user


// forget password


// reset password


// verify auth user 



// send forget password verification code


export default authRoute;