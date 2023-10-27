import {Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import Content from '../models/content';
import { IUserRequest } from '../interfaces/user';

// @Desc Create a new Post
// @Route /api/v1/content/post-content
// @Method POST
//@Access Private (User)

const createPost = asyncHandler (async (req: IUserRequest, res: Response, _next: NextFunction) => {
    const {title, body, category} = req.body

    try {
        if (!title || !body || !category) {
            res.status(400).json({ message: 'Title, body, and category are required..' });
          }
      
          const createNewPost = await Content.create({
            title,
            body,
            postedBy: req.user._id,
            category,
          })
    
          res.status(201).json({
            success: true,
            message: "Content Created Successfully",
            data: createNewPost
          })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error Creating Posting Content"
        })
    }
})

// @Desc fetch  Posted content
// @Route /api/v1/content/get-content
// @Method GET
//@Access Public

const getPostedContent = asyncHandler (async (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page if not specified
    
        // Calculate the skip value to determine the starting point for pagination
        const skip = (page - 1) * limit;
    
        // Retrieve a list of posts with pagination
        const posts = await Content.find()
          .skip(skip)
          .limit(limit);
    
        res.status(200).json({
          message: 'Posts retrieved successfully',
          data: posts,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching posts.' });
      }
});


// @Desc delete  Posted content
// @Route /api/v1/content/delete-content
// @Method DELETE
//@Access Private (User)
const deletePostedContent = asyncHandler (async (req: IUserRequest, res: Response, _next: NextFunction) => {
    try {
        const postId = req.params.postId; // Assuming you pass the post ID as a URL parameter
    
        // Use findByIdAndDelete to find and delete the post
        const deletedContent = await Content.findByIdAndDelete({ _id: postId, userId: req.user.id });
    
        if (!deletedContent) {
          res.status(404).json({ message: 'Post content not found or you do not have permission to delete it.' });
        }
    
        res.status(200).json({ message: 'Content deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting the Content.' });
      }
});



// @Desc Edit  Posted content
// @Route /api/v1/content/update-content/:postId
// @Method UPDATE
//@Access Private (User)
const updatePostedContent = asyncHandler (async (req: IUserRequest, res: Response, _next: NextFunction) => {
  try {
          const postId = req.params.postId; // Assuming you pass the post ID as a URL parameter
          const { title, body } = req.body;
      
          // Find the post by ID
          const content = await Content.findOne({ _id: postId });
      
          if (!content) {
            res.status(404).json({ message: 'Post not found.' });
          }
      
          // Verify the user's ownership or permission to update it
          if (content?.postedBy.toString() !== req.user.id) {
           res.status(403).json({ message: 'You do not have permission to update this post.' });
          }
      
          // Update the post using findByIdAndUpdate
          const updatedPostContent = await Content.findByIdAndUpdate(
            postId,
            { title, body },
            { new: true }
          );
      
          if (!updatedPostContent) {
           res.status(500).json({ message: 'Error updating the post.' });
          }
      
          res.status(200).json({ 
            message: 'Post updated successfully',
             data: updatedPostContent 
            });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error updating the post.' });
        }
});


export {
    createPost,
    getPostedContent,
    deletePostedContent,
    updatePostedContent
}