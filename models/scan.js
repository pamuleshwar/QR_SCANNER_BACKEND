import mongoose from "mongoose";

const scanSchema = new mongoose.Schema({
    sessionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Session",
        required : true,
    },
    codeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Code",
    },
    codeValue : {
        type : String,
        required : true,
    },
    timestamp : {
        type : Date,
        default : Date.now,
    },
    status : {
        type : String,
        enum : ["success","invalid_code","limit_exceeded"],
        required : true,
    },
});


scanSchema.index({sessionId : 1, timestamp : -1});
scanSchema.index({codeValue : 1});


export const Scan = mongoose.model("Scan",scanSchema);