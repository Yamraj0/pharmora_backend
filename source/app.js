import { setRandomFallback } from 'bcryptjs';
import express from 'express';
import { success } from 'zod';
import errorHandler from './middleware/ErrorHandlers';

const app = express();

app.use(express.json());

// 404 handler
app.use((req, res, next) => {
  const AppError = require("./utils/AppError");

  next(
    new AppError(
      `Route not found: ${req.method} ${req.originalUrl}`,
      404
    )
  );
});


app.use(errorHandler);


app.get('/',(req,res)=>{
    res.status(200).json({
        message:'hey Muji ',
        data:[],
        success:true
    })
});

export default app;