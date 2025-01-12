/*
const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.post("/login/kakao", userController.signInKakao);

module.exports = router;
*/

import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();

// 카카오 로그인 라우트
router.post("/auth/login/kakao", async (req, res, next) => {
  try {
    await userController.signInKakao(req, res);
  } catch (error) {
    next(error); // 에러 핸들러로 전달
  }
});

export default router;
