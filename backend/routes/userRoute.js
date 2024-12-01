import express from "express";
import { adminLogin, loginUser, registerUser, getProfile } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";


const userRouter = express.Router();

// Routes
userRouter.post('/register', registerUser); // User registration
userRouter.post('/login', loginUser);       // User login
userRouter.post('/admin', adminLogin);     // Admin login
userRouter.get('/profile', authUser, getProfile); // User profile (requires authentication)

export default userRouter;
