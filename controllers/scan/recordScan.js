import { Code } from "../../models/code.js";
import { Scan } from "../../models/scan.js";
import { Session } from "../../models/session.js";

export const recordScan = async (req, res) => {
    try{
        const {sessionId} = req.params;
        const {codeValue} = req.body;
        
        console.log("Session ID:", sessionId);
        console.log("Code Value:", codeValue);
        //session exists of active
        const session = await Session.findById(sessionId);

        if(!session || session.status !== "active"){
            return res.status(400).json({
                status : "error",
                message : "Session is not active",
            })
        };

        //find code in db
        const code = await Code.findOne({
            sessionId,
            codeValue,
        });

        //invalid code
        if(!code){
            const scan = new Scan({
                sessionId,
                codeValue,
                status : "invalid_code",
            });

            //record invalid code
            await scan.save();

            return res.json({
                status : "invalid_code",
                message : "Code not found in allowed list",
                codeValue
            })
        }


        //check scan limits
        if(code.currentScans >= code.allowedScans){
            const scan = new Scan({
                sessionId,
                codeId : code._id,
                codeValue,
                status : "limit_exceeded",
            });

            await scan.save();

            return res.json({
                status : "limit_exceeded",
                message : "Scan limit exceeded for this code",
                codeValue,
            })
        }


        //record the scan
        code.currentScans += 1;
        await code.save();

        const scan = new Scan({
            sessionId,
            codeId : code._id,
            codeValue,
            status : "success",
        });
        await scan.save();


        //return the response
        res.json({
            status : "success",
            message : "Scan recorded successfully",
            codeValue,
        })
    }catch(err){
        res.status(500).json({
            error : err.message,
        })
    }
}