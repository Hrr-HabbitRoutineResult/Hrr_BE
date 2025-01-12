import appDataSource from "./dataSource.js";

export const getUserById = async (kakaoId) => {
  return await appDataSource.query(
    `
    SELECT
        kakao_id,
        account_email,
        name,
        profile_image
    FROM users
    WHERE kakao_id=?`,
    [kakaoId]
  );
};

export const signUp = async (email, name, kakaoId, profileImage) => {
  return await appDataSource.query(
    `
    INSERT INTO users(
        account_email,
        name,
        kakao_id,
        profile_image
    ) VALUES (?, ?, ?, ?)`,
    [email, name, kakaoId, profileImage]
  );
};
