const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");


module.exports = {
  getProfile: async (req, res) => {
    try {
      req.user
        const posts = await Post.find({ user: req.user.id });
        res.render("profile.ejs", { posts: posts, user: req.user, profile: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getUserProfile: async (req, res) => {
    try {
      if (req.params.userId){
        const profile = await User.findById(req.params.userId)
        const posts = await Post.find({ user: profile.id });
        res.render("profile.ejs", { posts: posts, user: req.user, profile: profile });
      } else {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  },
}
