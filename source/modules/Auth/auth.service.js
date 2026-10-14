import Auth from './auth.model.js';
import AppError from '../../utils/AppError.js';
import argon from '../../utils/Argon.js';

const createAuth = async (authData)=>{
    const {username, email, password, role, organization, branch } = authData;
    
    // check for whether user is exists?

    const user = await Auth.findOne({ email , username ,organization, branch });
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
        role,
        organization,
        branch,
    });

    return newAuth;
}

const getAuth = async (authData) =>{
    const { id } = authData;

    if (!id) {
        throw new AppError('User ID is required', 400);
    }
    const auth = await Auth.findById(id);
    if(!auth){
        throw new AppError('User not found', 404);
    }
    return auth;
}

const authLogin = async (authData) => {
    const { email, password } = authData;

    // check if user exists
    const user = await Auth.findOne({ email });
    if (!user) {
        throw new AppError('Invalid email or No User exists', 401);
    }

    // Verify the password
    const isPasswordValid = await argon.verifyPassword(user.password,password);

    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    return user;
};


const authVerify = async (authData) => {
   const id = authData.decoded?.id || authData.params.id;
    const token = authData.params.token;

    console.log('Auth Verify - ID:', id); // Debugging line
    console.log('Auth Verify - Token:', token); // Debugging line


   if (!id || !token) {
       throw new AppError('User ID and token are required', 400);
   }

   const user = await Auth.findById(id);
   if (!user) {
       throw new AppError('User not found', 404);
   }

   if (user.verificationToken !== token) {
       throw new AppError('Invalid verification token', 400);
   }

   if (user.verificationTokenExpiry < Date.now()) {
       throw new AppError('Verification token has expired', 400);
   }

   // Mark the user as verified
   user.isVerified = true;
   user.verificationToken = undefined;
   user.verificationTokenExpiry = undefined;

   await user.save();

   return user;


}

const sendVerifyEmail = async (authData) => {
    const id = authData.decoded?.id || authData.body.id;
    const user = await Auth.findById(id);
    if (!user) {
        throw new AppError('User not found', 404);
    }

    // Generate a verification token
    const verificationToken = jwt.generateToken({ id: user._id }, '10m');
    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 1 day

    await user.save();

    return user;

}

export default {
    createAuth,
    authLogin,
    getAuth,
    authVerify,
    sendVerifyEmail
}
