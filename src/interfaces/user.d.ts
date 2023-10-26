import { Request } from "express"
import mongoose from "mongoose"
import Gender from "./genderType";


export interface IUserRequest extends Request {
    user?: any;
}

export interface IUser extends mongoose.Document {
    firstName: string;
    lastName:string;
    gender: typeof Gender;
    email: string;
    password: string;
    phoneNumber: number;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    resetPasswordToken?: string;
    resetPasswordTime?: Date;
    comparePassword(enteredPassword: string): Promise<Boolean>;
    getJwtToken(): string;
}
