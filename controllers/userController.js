import { userService } from "../services/userService.js";
import { asyncWrap } from "../middleware/errorControl.js";

export const signInKakao = asyncWrap(async (req, res) => {
  const headers = req.headers["authorization"];
  const kakaoToken = headers.split(" ")[1];

  const accessToken = await userService.signInKakao(kakaoToken);

  return res.status(200).json({ accessToken });
});
