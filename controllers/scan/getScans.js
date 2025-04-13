import { Scan } from "../../models/scan.js";

export const getScans = async (req, res) => {
    try{
        const {sessionId} = req.params;

        const {status, search, limit=50,sort = '-timestamp'} = req.query;

        const query = {sessionId};

        if(status){
            query.status = status;
        };

        if(search){
            query.codeValue = {$regex : search, $options : 'i'};
        }
        const scans = await Scan.find(query).sort(sort).limit(parseInt(limit));
        
        res.json(scans);
    }catch(err){
        res.status(500).json({
            error : err.message,
        })
    }
}