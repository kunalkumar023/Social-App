import express from "express"
import { deleteProfile, followUser, forgetPassword, getAllUser, getMyPosts, getUser, loginUser, logout, myProfile, registerUser, resetPassword, updatePassword, updateProfile } from "../controller/user.js"
import { authentication } from "../middleware/authentication.js"
import { getUserPosts } from "../controller/post.js"

const router= express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)
router.route("/logout").get(logout)

router.route("/follow/:id").get(authentication,followUser)

router.route("/update/password").put(authentication,updatePassword)
router.route("/update/profile").put(authentication,updateProfile)

router.route("/delete/me").delete(authentication,deleteProfile)
router.route("/me").get(authentication,myProfile)

router.route("/my/posts").get(authentication,getMyPosts)
router.route("/userposts/:id").get(authentication,getUserPosts)


router.route("/user/:id").get(authentication,getUser)
router.route("/alluser").get(authentication,getAllUser)

router.route("/forgot/password").post(forgetPassword)
router.route("/password/reset/:token").put(resetPassword)

export default router