import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    areaName : {
        type : String,
        required : true,
    },
    location : {
        coordinates : {
            type : [Number], //[longitude, latitude]
            required : true,
        },
        manualOverride : {
            type : Boolean,
            default : false,
        }
    },
    mobileNumber : {
        type : String,
        required : true,
    },
    startTime : {
        type : Date,
        default : Date.now,
    },
    endTime : {
        type : Date,
        required : true,
    },
    status : {
        type : String,
        enum : ["active","completed"],
        default : "active"
    }
}, {timestamps : true});

sessionSchema.index({location : "2dsphere"});


export const Session = mongoose.model("Session",sessionSchema);