import express from 'express';
import { recordScan } from '../controllers/scan/recordScan.js';
import { getScans } from '../controllers/scan/getScans.js';
import { exportScans } from '../controllers/scan/exportScans.js';

const scanRouter = express.Router();

scanRouter.post("/:sessionId",recordScan);
scanRouter.get("/:sessionId",getScans);
scanRouter.get("/:sessionId/export",exportScans);


export default scanRouter;