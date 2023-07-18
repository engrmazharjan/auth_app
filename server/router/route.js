import { Router } from "express";
const router = Router();

/** Import All Controllers */
import * as controller from "../controllers/appController.js";

/* POST Methods */
router.route("/register").post(controller.register); // Register user
// router.route("/registerMail").post(); // Send the email
router.route("/authenticate").post((req, res) => res.end()); // Authenticate
router.route("/login").post(controller.login); // Login in app

/* GET Methods */
router.route("/user/:username").get(controller.getUser); // User with username
router.route("/generateOPT").get(controller.generateOTP); // Generate random OTP
router.route("/verifyOPT").get(controller.verifyOTP); // Verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); // Reset All the variables

/* PUT Methods */
router.route("/updateuser").put(controller.updateUser); // Used to update the user profile
router.route("/resetPassword").put(controller.resetPassword); // Used to reset password

export default router;
