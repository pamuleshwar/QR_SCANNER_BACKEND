import express from 'express';
import { connectDB } from './config/db.js';
import router from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ORIGIN_URL, PORT } from './constants.js';

const app = express();

//cors
app.use(cors({
    origin: ORIGIN_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

//parse cookies
app.use(cookieParser());

//read json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//provide router
app.use("/",router);

//connect to database then listen the app
connectDB().then(() => {
    console.log("Database connected successfully...");

    //listen the app
    app.listen(PORT, () => {
        console.log(`App is listening on PORT : ${PORT}`);
    })
}).catch((err) => {
    console.log(err.message);
})