import {Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../models/category';

// @Desc create  a new category
// @Route /api/v1/category/add-category
// @Method POST
//@Access Public
const createCategory = asyncHandler (async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
    res.status(400).json({ message: 'Category name is required.' });
    }

    const newCategory = new Category({ name });

    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', data: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the category.' });
  }
});

// @Desc update  the category
// @Route /api/v1/category/update-category
// @Method PUT
//@Access 
const updateCategory = asyncHandler (async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
        const { name } = req.body;
    
        const category = await Category.findByIdAndUpdate(
          categoryId,
          { name },
          { new: true }
        );
    
        if (!category) {
         res.status(404).json({ message: 'Category not found.' });
        }
    
        res.status(200).json({ message: 'Category updated successfully', data: category });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating the category.' });
      }
});


// @Desc fetch  the category
// @Route /api/v1/category
// @Method GET
//@Access 
const getCategories = asyncHandler (async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ message: 'Categories retrieved successfully', data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching categories.' });
  }
});

// @Desc delete  the category
// @Route /api/v1/category/delete-category
// @Method PUT
//@Access 
const deleteCategory = asyncHandler (async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
    
        const category = await Category.findByIdAndDelete(categoryId);
    
        if (!category) {
           res.status(404).json({ message: 'Category not found.' });
        }
    
        res.status(200).json({ message: 'Category deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting the category.' });
      }
  });


  export {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
  }