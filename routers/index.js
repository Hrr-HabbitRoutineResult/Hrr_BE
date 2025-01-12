import express from "express";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use("/auth", userRouter);

export default router;

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
