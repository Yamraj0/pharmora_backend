
import express from 'express';
import cookieParser from 'cookie-parser';

import errorHandler from './middleware/ErrorHandlers.js';
 import AppError from "./utils/AppError.js";
import authRoute from './modules/Auth/auth.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.status(200).json({
        message:'hey Muji ',
        data:[],
        success:true
    })
});

app.use('/api/v1/auth',authRoute);

// 404 handler
app.use((req, res, next) => {
 

  next(
    new AppError(
      `Route not found: ${req.method} ${req.originalUrl}`,
      404
    )
  );
});


app.use(errorHandler);



export default app;