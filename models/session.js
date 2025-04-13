import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    areaName: {
        type: String,
        required: true,
    },
    location: {
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function(v) {
                    return v.length === 2 && 
                           typeof v[0] === 'number' && 
                           typeof v[1] === 'number';
                },
                message: 'Coordinates must be an array of two numbers'
            }
        },
        manualOverride: {
            type: Boolean,
            default: false,
        }
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    }
}, { timestamps: true });

export const Session = mongoose.model("Session", sessionSchema);