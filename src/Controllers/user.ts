import {Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/user';
import Gender from '../interfaces/genderType';
import { IUserRequest } from '../interfaces/user';


// @Desc Create a new user
// @Route /api/users/create-user
// @Method POST
//@Access Public

const createUser = asyncHandler(async (req: IUserRequest, res: Response, _next: NextFunction) => {
    try {
      const { firstName, lastName, email, password, gender,  } = req.body;
  
      // Check if the provided email already exists in the database
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        res.status(400).json({
          success: false,
          error: 'Email already exists',
        });
        return;
      }
  
      // Validate gender
      if (![Gender.Male, Gender.Female].includes(gender)) {
        res.status(400).json({
          success: false,
          error: 'Invalid gender selection',
        });
        return;
      }
  
      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        gender,
      });
  
        await newUser.save();
    
  
      res.status(201).json({
        success: true,
        data: {
          message: 'User created successfully',
          user: newUser,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Error creating user',
      });
    }
  });

  export {
    createUser
  }