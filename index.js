import express from "express";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
dotenv.config(); // env 파일 로드

const app = express();
const port = process.env.PORT;

app.use(express.json());
const router = express.Router();

app.use("/api/v1/users", userInfoRouter); // 사용자 정보 조회 및 수정

router.use("/auth", userRouter); // 카카오 로그인

export default router;

app.listen(port, () => {
  console.log("Server is running on port ${port}");
});
