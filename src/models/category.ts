import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces/category";

const categorySchema: Schema<ICategory> = new mongoose.Schema({
    name: {
        type: String,
    },
}, {
    timestamps: true
})

const Category = mongoose.model<ICategory>("Category", categorySchema)

export default Category