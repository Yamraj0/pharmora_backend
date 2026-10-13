import { configDotenv } from 'dotenv';
configDotenv();
import app from './source/app.js';
import env from './source/config/env.js';
import connectDB from './source/config/connectDB.js';

// Connect to MongoDB
connectDB();



const PORT = env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`)
    console.log(`http://localhost:${PORT}/`)
})


