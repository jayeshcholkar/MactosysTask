const userRouter = require("express").Router();
const user = require("../controllers/userController");
const upload = require("../middleware/imageStorage");

userRouter.post("/signup", upload.single('profilePic'), user.userSignup);
userRouter.post("/login", user.userLogin);

module.exports = userRouter;
