import mongoose from 'mongoose';


const authSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type:String,
        enum: ['admin', 'user','staff'],
        default: 'user'
    },
    organization: {
        type: String,
        lowercase: true,
        trim: true,
    },
    branch :{
        type:String,
        lowercase: true,
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date,
    },
    otpCode: {
        type: String,
    },
    otpCodeExpiry: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

export default mongoose.model('Auth',authSchema);