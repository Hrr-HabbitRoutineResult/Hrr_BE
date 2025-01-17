import express from "express";
import { getUserInfo, updateUserInfo } from "./userInfoController.js";
import authenticateToken from "./middleware/auth.js";

const router = express.Router();

// 사용자 정보 조회
router.get("/me", authenticateToken, getUserInfo);

// 사용자 정보 수정
router.put("/me", authenticateToken, updateUserInfo);

export default router;
