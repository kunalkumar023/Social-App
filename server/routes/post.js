import express from 'express'
import { addComments, createPost, deleteComment, deletePost, likeAndUnlike, postsOfFollowing, updatePost } from '../controller/post.js';
import { authentication } from '../middleware/authentication.js';

const router = express.Router()

router.route("/post/upload").post(authentication,createPost);
router.route("/post/:id").get(authentication,likeAndUnlike).delete(authentication,deletePost).put(authentication,updatePost)
router.route("/posts").get(authentication,postsOfFollowing)

router.route("/post/comment/:id").put(authentication,addComments).delete(authentication,deleteComment)



export default router;