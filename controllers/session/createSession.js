import { Session } from "../../models/session.js";
import { Code } from "../../models/code.js";
import csv from 'csv-parser';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SIGNATURE } from "../../constants.js";

export const createSession = async (req, res) => {
    try {
        //no csv file
        if (!req.file) {
            return res.status(400).json({ error: 'CSV file is required' });
        }

        const { userName, areaName, mobileNumber, location } = req.body;
        // console.log('Request body:', req.body);
        // console.log(location);

        const parsedLocation = JSON.parse(location);
        // console.log(parsedLocation);

        // Validate coordinates
        if (!Array.isArray(parsedLocation) || parsedLocation.length !== 2) {
            return res.status(400).json({ error: 'Invalid location format' });
        }

        //hash => mobile number
        const hashMobile = await bcrypt.hash(mobileNumber,10);

        // Create session
        const session = new Session({
            userName,
            areaName,
            location: {
                //coordinates => Number
                coordinates: [
                    parseFloat(parsedLocation[0]),
                    parseFloat(parsedLocation[1])
                ],
                manualOverride: false
            },
            mobileNumber : hashMobile,
            status: "active"
        });

        const sessionData = await session.save();

        // console.log(sessionData);

        const token = await jwt.sign({sessionId : session._id},SIGNATURE);

        // Process CSV file
        const codes = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (row) => {
                if (row.code) {
                    codes.push({
                        sessionId: session._id,
                        codeValue: row.code,
                        allowedScans: parseInt(row.allowedScans) || 1
                    });
                }
            })
            .on('end', async () => {
                try {
                    if (codes.length > 0) {
                        await Code.insertMany(codes);
                    }
                    fs.unlinkSync(req.file.path);

                    //attach jwtToken with cookies
                    res.cookie("token",token);


                    res.status(201).json({ 
                        sessionId: session._id,
                        message: 'Session created successfully'
                    });
                } catch (error) {
                    console.error('Error saving codes:', error);
                    await Session.findByIdAndDelete(session._id);
                    fs.unlinkSync(req.file.path);
                    res.status(500).json({ error: 'Error processing CSV file' });
                }
            })
            .on('error', (error) => {
                console.error('CSV error:', error);
                Session.findByIdAndDelete(session._id).catch(console.error);
                fs.unlinkSync(req.file.path);
                res.status(400).json({ error: 'Invalid CSV file' });
        });

    } catch (err) {
        console.error('Session error:', err);
        if (req.file?.path) fs.unlinkSync(req.file.path);
        res.status(500).json({ 
            error: 'Internal server error',
            details: err.message 
        });
    }
};