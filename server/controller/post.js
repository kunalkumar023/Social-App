import Post from '../models/Post.js'
import User from "../models/User.js"
import cloudinary from "cloudinary"

//Create post
export const  createPost = async(req,res)=>{

    try {
        
        
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image,{
            folder:"posts",
        })
        const newPostData ={
            caption:req.body.caption,
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
            owner:req.user._id
        }
        const newPost = await Post.create(newPostData);

        const user= await User.findById(req.user._id);
        user.posts.unshift(newPost._id)

        await user.save()
        res.status(201).json({
            success:true,
            message:"Post Created"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

//update post

export const updatePost=async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        const newCaption = req.body.caption
        if(!post){
            return res.status(404).json({
                status:false,
                message:"Post not found"
            })
        }

        if(post.owner.toString != req.user._id.toString){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }
        
        post.caption=newCaption

        await post.save()

        res.status(200).json({
            success:true,
            message:"Post updated successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Delete Post
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Ensure the user is the owner of the post
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // Destroy the image from cloudinary
        if (post.image.public_url) {
            await cloudinary.v2.uploader.destroy(post.image.public_url);
        }

        // Delete the post from the database
        await Post.deleteOne({ _id: postId });

        // Find the user and update their posts
        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(postId);
        if (index > -1) {
            user.posts.splice(index, 1);
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Post deleted"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//LikeAndUnlike

export const likeAndUnlike=async(req,res)=>{
    try {

        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }

        if(post.likes.includes(req.user._id)){
            const index=post.likes.indexOf(req.user._id)
            post.likes.splice(index,1)
            await post.save()
            return res.status(200).json({
                success:true,
                message:"Post unliked"
            })
        }
        else{
        post.likes.push(req.user._id)
        await post.save()
        return res.status(200).json({
            success:true,
            message:"Post liked"
        })
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Following ki post


export const postsOfFollowing = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
  
      const posts = await Post.find({
        owner: { $in: user.following }
      })
      .populate('owner')
      .populate('comments.user')
      .populate('likes');
  
  
      res.status(200).json({
        success: true,
        posts: posts.reverse()
      });
    } catch (error) {
      console.error("Error fetching posts of following:", error); // Add detailed logging
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };


//Add and update comments
export const addComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        let commentIndex = -1;
        console.log(post.comments);
        
        post.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) {
                commentIndex = index;
            }
        });
    
        if (commentIndex !== -1) {
            post.comments[commentIndex].comment = req.body.comment;
            await post.save();
            res.status(200).json({
                success: true,
                message: "Comment updated"
            });
        } else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            });

            await post.save();
            res.status(200).json({
                success: true,
                message: "Comment added"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//Delete comment

export const deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const { commentId } = req.body;
        if (!commentId) {
            return res.status(400).json({
                success: false,
                message: "Comment id is needed"
            });
        }

        if (post.owner.toString() === req.user._id.toString()) {
            // If the owner of the post is deleting any comment
            post.comments = post.comments.filter(
                (comment) => comment._id.toString() !== commentId.toString()
            );
        } else {
            // If a user is deleting their own comment
            post.comments = post.comments.filter(
                (comment) => comment._id.toString() !== commentId.toString() || comment.user.toString() !== req.user._id.toString()
            );
        }

        await post.save();

        res.status(200).json({
            success: true,
            message: "Selected comment deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getUserPosts=async(req,res)=>{
    try {
        const user= await User.findById(req.params.id)

        const posts=[]

        for(let i=0;i<user.posts.length;i++){
            const post=await Post.findById(user.posts[i]).populate("likes comments.user owner")
            posts.push(post)
        }

        res.status(200).json({
            success:true,
            posts
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}