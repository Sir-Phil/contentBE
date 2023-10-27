import mongoose, { Schema } from "mongoose";
import { IContent } from "../interfaces/content";

const contentSchema: Schema<IContent> = new mongoose.Schema({
    title:{
        type: String,

    },
    body :{
        type: String
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true
}
)

const Content = mongoose.model<IContent>("Contents", contentSchema);

export default Content