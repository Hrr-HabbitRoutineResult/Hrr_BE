//const { userDao } = require("../models");
//const axios = require("axios");
//const jwt = require("jsonwebtoken");

import { userDao } from "../models/userDao.js";
import axios from "axios";
import jwt from "jsonwebtoken";

export const signInKakao = async (kakaoToken) => {
  const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const { data } = result;
  const name = data.properties.nickname;
  const email = data.kakao_account.email;
  const kakaoId = data.id;
  const profileImage = data.properties.profile_image;

  if (!name || !email || !kakaoId) {
    throw new Error("KEY_ERROR");
  }

  const user = await userDao.getUserById(kakaoId);

  if (!user) {
    await userDao.signUp(email, name, kakaoId, profileImage);
  }

  return jwt.sign({ kakao_id: kakaoId }, process.env.TOKKENSECRET);
};
