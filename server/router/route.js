import { Router } from "express";
const router = Router();

/** Import All Controllers */
import * as controller from "../controllers/appController.js";
import Auth, { localVariables } from "../middleware/auth.js";

/* POST Methods */
router.route("/register").post(controller.register); // Register user
// router.route("/registerMail").post(); // Send the email
router.route("/authenticate").post((req, res) => res.end()); // Authenticate
router.route("/login").post(controller.verifyUser, controller.login); // Login in app

/* GET Methods */
router.route("/user/:username").get(controller.getUser); // User with username
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP); // Generate random OTP
router.route("/verifyOTP").get(controller.verifyOTP); // Verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); // Reset All the variables

/* PUT Methods */
router.route("/updateuser").put(Auth, controller.updateUser); // Used to update the user profile
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword); // Used to reset password

export default router;
