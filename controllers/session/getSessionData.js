import { Scan } from "../../models/scan.js";

export const getSessionData = async (req, res) => {
    try{
        const {sessionId} = req.params;

        const totalScans = await Scan.countDocuments({sessionId});

        const successfulScans = await Scan.countDocuments({sessionId,
            status : "success",
        });
        
        const failedScans = totalScans - successfulScans;

        res.json({
            total: totalScans,
            success: successfulScans,
            failed: failedScans,
        });

    }catch(err){
        res.status(500).json({error : err.message});
    }
}