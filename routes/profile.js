const express = require("express");
const router = express.Router();
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
router.get("/following/:profileId", profileController.getUserProfileFollowing);
router.get("/settings", ensureAuth, profileController.getUserProfileSettings);
router.put("/settings", ensureAuth, profileController.updateUserProfileSettings);



module.exports = router;
