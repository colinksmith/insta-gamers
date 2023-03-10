const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", ensureAuth, profileController.getProfile);
router.get("/user/:profileId", profileController.getUserProfile);
router.get("/followers/:profileId", profileController.getUserProfileFollowers);
router.post("/follow/:profileId", ensureAuth, profileController.followProfile);
router.put("/unFollow/:profileId", ensureAuth, profileController.unFollowProfile);
router.get("/following/:profileId", profileController.getUserProfileFollowing);
router.get("/settings", ensureAuth, profileController.getUserProfileSettings);
router.put("/settings", ensureAuth, profileController.updateUserProfileSettings);
router.put("/profilepic", ensureAuth, upload.single("file"), profileController.updateUserProfilePic);




module.exports = router;
