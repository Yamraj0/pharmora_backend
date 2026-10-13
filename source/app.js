
import express from 'express';

import errorHandler from './middleware/ErrorHandlers.js';
 import AppError from "./utils/AppError.js";

const app = express();

app.use(express.json());


app.get('/',(req,res)=>{
    res.status(200).json({
        message:'hey Muji ',
        data:[],
        success:true
    })
});

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