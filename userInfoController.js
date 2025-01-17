import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 사용자 정보 조회
export const getUserInfo = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        badges: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        resultType: "FAILURE",
        error: "User not found",
      });
    }

    res.json({
      resultType: "SUCCESS",
      error: null,
      success: {
        data: {
          id: user.id,
          name: user.name,
          gender: user.gender,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profilePhoto: user.profilePhoto,
          level: user.level,
          points: user.points,
          followerCount: user.followerCount,
          followingCount: user.followingCount,
          badges: user.badges.map((badge) => ({
            id: badge.id,
            name: badge.name,
            icon: badge.icon,
          })),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      resultType: "FAILURE",
      error: "Internal server error",
    });
  }
};

// 사용자 정보 수정
export const updateUserInfo = async (req, res) => {
  try {
    const { name, email, gender, profilePhoto } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: { name, email, gender, profilePhoto },
    });

    res.json({
      resultType: "SUCCESS",
      error: null,
      success: {
        userInfo: {
          id: updatedUser.id,
          phoneNumber: updatedUser.phoneNumber,
          level: updatedUser.level,
          points: updatedUser.points,
          followerCount: updatedUser.followerCount,
          followingCount: updatedUser.followingCount,
          badges: updatedUser.badges.map((badge) => ({
            id: badge.id,
            name: badge.name,
            icon: badge.icon,
          })),
        },
        data: {
          name: updatedUser.name,
          gender: updatedUser.gender,
          email: updatedUser.email,
          profilePhoto: updatedUser.profilePhoto,
        },
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      resultType: "FAILURE",
      error: "Internal server error",
    });
  }
};
