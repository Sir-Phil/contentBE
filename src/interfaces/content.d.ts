import mongoose, { Document } from "mongoose";

export interface IContent extends mongoose.Document {
    postedBy: mongoose.Types.ObjectId | IUser;
    title: string;
    body: string;
}