import express from 'express';
import sessionRouter from './sessionRoutes.js';
import scanRouter from './scanRoutes.js';

const router = express.Router();

router.use("/session",sessionRouter);
router.use("/scan",scanRouter);


export default router;