import express from 'express';
import { connectDB } from './config/db.js';

const app = express();

//connect to database then listen the app
connectDB().then(() => {
    console.log("Database connected successfully...");

    //listen the app
    app.listen(8000, () => {
        console.log("App is listening on PORT : 8000");
    })
}).catch((err) => {
    console.log(err.message);
})