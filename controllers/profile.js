const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const validator = require("validator");



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
  unFollowProfile: async (req, res) => {
    try {
      await User.updateOne(
        { _id: req.user.id },
        {
          $pull: { following: req.params.profileId },
        }
      );
      await User.updateOne(
        { _id: req.params.profileId },
        {
          $pull: { followers: req.user.id },
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
      console.log(req.body)
      const targetUserName = await User.findOne({userName: req.body.name})
      const targetEmail = await User.findOne({email: req.body.email})

      const validationErrors = [];
      if (targetUserName && targetUserName.userName !== req.user.userName){
        validationErrors.push({ msg: "Username is already taken." });
      }
      if (targetEmail && targetEmail.email !== req.user.email){
        validationErrors.push({ msg: "Email address is already taken." });
      }
      if (!validator.isEmail(req.body.email)){
        validationErrors.push({ msg: "Please enter a valid email address." });
      }
    
      if (validationErrors.length) {
        req.flash("errors", validationErrors);
        return res.redirect("/profile/settings");
      }
      req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
      });

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
  updateUserProfilePic: async (req, res) => {
    try {
      // Upload image to cloudinary
      console.log(req.file)
      const upload = await cloudinary.uploader.upload(req.file.path);
      if (req.user.cloudinaryId){
        await cloudinary.uploader.destroy(req.user.cloudinaryId);
      }

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
        picLink: upload.secure_url,
        cloudinaryId: upload.public_id,
      });
      console.log("profile pic has been added!");
      res.redirect("/profile/settings");
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
}
