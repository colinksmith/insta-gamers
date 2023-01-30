const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");


module.exports = {
  getProfile: async (req, res) => {
    try {
      req.user
        const posts = await Post.find({ user: req.user.id });
        res.render("profile-posts.ejs", { posts: posts, user: req.user, profile: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getUserProfile: async (req, res) => {
    try {
      if (req.params.profileId){
        const profile = await User.findById(req.params.profileId)
        const posts = await Post.find({ user: profile.id });
        res.render("profile-posts.ejs", { posts: posts, user: req.user, profile: profile });
      } else {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  },
  getUserProfileFollowers: async (req, res) => {
    try {
      if (req.params.profileId){
        const profile = await User.findById(req.params.profileId).populate('followers')
        res.render("profile-followers.ejs", { user: req.user, profile: profile });
      } else {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  },
  getUserProfileFollowing: async (req, res) => {
    try {
      if (req.params.profileId){
        const profile = await User.findById(req.params.profileId).populate('following')
        res.render("profile-following.ejs", { user: req.user, profile: profile });
      } else {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  },
  followProfile: async (req, res) => {
    try {
      await User.updateOne(
        { _id: req.user.id },
        {
          $push: { following: req.params.profileId },
        }
      );
      await User.updateOne(
        { _id: req.params.profileId },
        {
          $push: { followers: req.user.id },
        }
      )
      res.redirect(`/profile/user/${req.params.profileId}`);
    } catch (err) {
      console.log(err);
    }
  },
  getUserProfileSettings: async (req, res) => {
    try {
        req.user
        res.render("profile-settings.ejs", { user: req.user, profile: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  updateUserProfileSettings: async (req, res) => {
    try {
      // console.log(req.user)
      console.log(req.body)
      const targetUserName = await User.findOne({userName: req.body.name})
      const targetEmail = await User.findOne({email: req.body.email})

      if (targetUserName && targetUserName.userName !== req.user.userName){
        console.log('username taken')
      }
      if (targetEmail && targetEmail.email !== req.user.email){
        console.log('email taken')
      }
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $set: { 
            userName: req.body.name,
            email: req.body.email,
            bio: req.body.bio,
          },
        }
      );
      console.log("Profile updated");
      res.redirect('/profile/settings');
    } catch (err) {
      console.log(err);
    }
  },
}
