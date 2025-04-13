import jwt from 'jsonwebtoken';
import { Session } from '../../models/session.js';
import { SIGNATURE } from '../../constants.js';

export const getSession = async (req, res) => {
    try{
        const cookies = req.cookies;

        const {token} = cookies;

        if(!token){
            return res.status(401).json({
                error : "Sessoin expired"
            })
        };

        //validate the token
        const validatedToken = await jwt.verify(token,SIGNATURE);

        const {sessionId} = validatedToken;

        //find the active session
        const sessionIsActive = await Session.findOne({
            _id : sessionId,
            status : "active",
        });

        //no active session found
        if(!sessionIsActive){
            return res.status(400).json({
                sessionId : null,
            })
        };

        res.status(200).json({
            sessionId : sessionId,
        });

    }catch(err){
        res.status(500).json({error : err.message});
    }
}