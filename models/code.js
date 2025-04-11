import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    sessionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Session",
        required : true,
    },
    codeValue : {
        type : String,
        required : true,
    },
    allowedScans : {
        type : Number,
        required : true,
        min : 1,
    },
    currentScans : {
        type : Number,
        default : 0,
    }
});

codeSchema.index({sessionId : 1, codeValue : 1},{unique : true});


export const Code = mongoose.model("Code",codeSchema);