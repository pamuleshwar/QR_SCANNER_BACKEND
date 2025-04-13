import express from 'express';
import { createSession } from '../controllers/session/createSession.js';
import { getSessionData } from '../controllers/session/getSessionData.js';
import upload  from '../middleware/upload.js';
import { endSession } from '../controllers/session/endSession.js';
import { getSession } from '../controllers/session/getSession.js';

const sessionRouter = express.Router();

sessionRouter.post("/",upload.single('csvFile'),createSession);
sessionRouter.get("/", getSession);
sessionRouter.get("/:sessionId",getSessionData);
sessionRouter.delete("/:sessionId", endSession);


export default sessionRouter;