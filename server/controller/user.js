import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js"
import Post from "../models/Post.js"
import { sendEmail } from "../middleware/sendEmail.js"
import cloudinary from "cloudinary"
import crypto from 'crypto';


export const registerUser = async (req, res) => {
    try {
        const {avatar, name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
     
        const myCloud = await cloudinary.v2.uploader.upload(avatar,{
            folder:"avatar",
        })
      
        user = await User.create({ name, email, password:hashedPassword, avatar: { public_id:myCloud.public_id, url: myCloud.secure_url } });
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



export const loginUser=async(req,res)=>{
    try {
        
        const {email,password} =req.body;
        const isUser = await User.findOne({email}).select("+password")
        if(!isUser){
            return res.json({
                success:false,
                message:"User not exists please Register yourself...."
            })
        }
        if(await bcrypt.compare(password,isUser.password)){
            const token = jwt.sign({_id:isUser._id}, process.env.KEY)

            res.status(200).cookie("token",token,{
                expires: new Date(Date.now()+90*24*60*60*1000),
                HttpOnly:true
            }).json({
                success:true,
                message:"User login successfully",
                isUser,
                token
            })
        }
        else{
            return res.json({
                success:false,
                message:"Password doesn't match"
            })
        }
    } catch (error) {
        console.log("inside",email,password)

        res.status(500).json({
            success:true,
            message:error.message
        })
    }
    
}

//logout

export const logout=async(req,res)=>{
    try {
        
        res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"Logout successfully.."
        })

    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

//Update password

export const updatePassword=async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).select("+password")

        const {oldPassword, newPassword} = req.body

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Please provide a password"
            })
        }

        if(!await bcrypt.compare(oldPassword,user.password)){
            return res.status(400).json({
                success:false,
                message:"Old incorrect password"
            })
        }

        const newHashedPassword = await bcrypt.hash(newPassword,10);
        user.password=newHashedPassword

        await user.save()

        res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

//update profile

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const { name, email, avatar } = req.body

        // Check if the email is already registered but ignore the current user's email
        const isEmail = await User.findOne({ email, _id: { $ne: req.user._id } })
        if (isEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered."
            })
        }

        if (name) user.name = name;
        if (email) user.email = email;

        if (avatar) {
            console.log("Avatar processing")
            if (user.avatar.public_id) {
                // Remove the previous avatar from Cloudinary if exists
                await cloudinary.v2.uploader.destroy(user.avatar.public_id)
            }

            console.log("Uploading new avatar")
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatar",
            })
            console.log("Upload complete")

            user.avatar.public_id = myCloud.public_id
            user.avatar.url = myCloud.secure_url
        }

        await user.save()
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        })
    } catch (error) {
        console.error("Error occurred:", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const followUser=async(req,res)=>{
    try {

        const userToFollow = await User.findById(req.params.id)
        const logedInUser = await User.findById(req.user._id)

        if(!userToFollow){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        if(logedInUser.following.includes(userToFollow._id)){

            const indexFollowing = logedInUser.following.indexOf(userToFollow._id)
            const indexFollower = userToFollow.followers.indexOf(logedInUser._id)
            console.log(indexFollowing,indexFollower)

            logedInUser.following.splice(indexFollowing,1)
            userToFollow.followers.splice(indexFollower,1)
            console.log(logedInUser)
            await logedInUser.save()
            await userToFollow.save()

            res.status(200).json({
                success:true,
                message:"User unfollowed successfully"
            })
        }
        else{

        userToFollow.followers.push(logedInUser._id)
        logedInUser.following.push(userToFollow._id)

        await userToFollow.save()
        await logedInUser.save()

        res.status(200).json({
            success:true,
            message:"User followed successfully"
        })
    }
        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }

}

//Delete profile
export const deleteProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const userId = req.user._id;
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      // Delete user's avatar from Cloudinary
      if (user.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      }
  
      // Delete user
      await User.deleteOne({ _id: userId });
  
      // Clear token cookie
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
      });
  
      // Delete all posts of the user
      const deletePosts = user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post) {
          if (post.image.public_id) {
            await cloudinary.v2.uploader.destroy(post.image.public_id);
          }
          await Post.deleteOne({ _id: postId });
        }
      });
      await Promise.all(deletePosts);
  
      // Remove userId from followers' following lists
      const updateFollowers = user.followers.map(async (followerId) => {
        const follower = await User.findById(followerId);
        if (follower) {
          follower.following = follower.following.filter(followingId => followingId.toString() !== userId.toString());
          await follower.save();
        }
      });
      await Promise.all(updateFollowers);
  
      // Remove userId from following's followers lists
      const updateFollowing = user.following.map(async (followingId) => {
        const followedUser = await User.findById(followingId);
        if (followedUser) {
          followedUser.followers = followedUser.followers.filter(followerId => followerId.toString() !== userId.toString());
          await followedUser.save();
        }
      });
      await Promise.all(updateFollowing);
  
      // Update all posts to remove comments and likes by the user
      const allPosts = await Post.find();
      for (const post of allPosts) {
        const originalCommentCount = post.comments.length;
        const originalLikeCount = post.likes.length;
  
        post.comments = post.comments.filter(comment => comment.user.toString() !== userId.toString());
        post.likes = post.likes.filter(like => like.user.toString() !== userId.toString());
  
        if (post.comments.length !== originalCommentCount || post.likes.length !== originalLikeCount) {
          await post.save();
        }
      }
  
      res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  


//See my profile

export const myProfile=async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).populate("posts followers following")

        res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get any user

export const getUser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id).populate("posts")
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

//Get all user

export const getAllUser=async(req,res)=>{
    try {
        const allUser = await User.find({
            name:{$regex:req.query.name,$options:"i"}
        })
        res.status(200).json({
            success:true,
            allUser
        })
    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

// Forget Password
export const forgetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const resetPasswordToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`;
        const message = `Reset your password by clicking on the link below: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Reset Password",
                message,
            });

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email}`,
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            res.status(500).json({
                success: false,
                message: "Email could not be sent",
                error: error.message,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {

        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");
          
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or has expired",
            });
        }
  
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
   
        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//get my posts

export const getMyPosts=async(req,res)=>{
    try {
        const user= await User.findById(req.user._id)

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