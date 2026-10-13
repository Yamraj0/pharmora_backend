import Auth from './auth.model.js';
import AppError from '../../utils/AppError.js';
import argon from '../../utils/Argon.js';

const createAuth = async (authData)=>{
    const {username, email, password, roll, organization, branch } = authData;
    
    // check for whether user is exists?

    const user = await Auth.findOne({ email , username });
    if(user){
        throw new AppError('User already exists', 400);
    }

    // Hash the password before saving
    const hashedPassword = await argon.hashPassword(password);

    // Create a new user

    const newAuth = await Auth.create({
        username,
        email,
        password : hashedPassword,
        roll,
        organization,
        branch,
    });

    return newAuth;
}


export default {
    createAuth,
}
