import {Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/user';
import Gender from '../interfaces/genderType';
import { IUserRequest } from '../interfaces/user';
import sendToken from '../Utils/tokenize';


// @Desc Create a new user
// @Route /api/v1/user/create-user
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

// @Desc log-in user
// @Route /api/v1/user/login-user
// @Method POST

const loginUser = asyncHandler(async (req: IUserRequest, res: Response, _next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: 'Please provide valid email and password',
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const isPasswordMatch = await user?.comparePassword(password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Password match, send the token
    sendToken(user, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Error logging in',
    });
  }
});

// @Desc Log-out user
// @Route /api/v1/user/logout
// @Method GET

const logOutUser = asyncHandler (async ( _req: Request, res: Response, _next: NextFunction) => {
  try {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(201).json({
        success: true,
        message: "Log out successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error"
  });
  }
});


// @Desc load a user logged in
// @Route /api/user/v1/user-details
// @Method GET

const getLoggedUser = asyncHandler(async (req: IUserRequest, res: Response, _next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User does not exist",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: "Error fetching user data",
    });
  }
});


// @Desc Update profile
// @Route /api/v1/user/update-user
// @Method PUT

const updateUserInfo = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { email, gender, phoneNumber, firstName, lastName } = req.body;
    const userId = req.params.userId; 

    // Find the user by ID
    const user = await User.findById(userId).select("+email +password");

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    if (email !== user?.email) {
      res.status(400).json({
        success: false,
        error: "Changing email during update is not allowed",
      });
    }

    if(user){
      user.firstName = firstName;
      user.phoneNumber = phoneNumber;
      user.lastName = lastName;
      user.gender = gender;

      await user.save();

    }
   
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
});

// @Desc delete User for ---- 
// @Route /api/v1/user/delete-user/:id
// @Method DELETE
//@access Private (user)
const deleteUser = asyncHandler(async (req: IUserRequest, res: Response, _next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User is not available with this Id",
      });
    } else {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
      });
    }
  } catch (error: any) {
    res.status(500).json({
        success: false,
        error: error.message || "Internal Server Error",
      });
    }
  });



  
  export {
    createUser,
    loginUser,
    logOutUser,
    updateUserInfo,
    getLoggedUser,
    deleteUser
  }