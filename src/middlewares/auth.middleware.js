import jwt from 'jsonwebtoken';
import authService from '../services/auth.service.js';
import logger from '../logger.js';
import authError from '../errors/auth.error.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    throw new authError.AccessTokenError('Access token required');
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    // Token expired
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.body.refreshToken;

      if (!refreshToken) {
        throw new authError.TokenExpiredError('Refresh token required');
      }

      try {
        // Verify refresh token
        const user = authService.verifyRefreshToken(refreshToken);
        const { accessToken, refreshToken: newRefreshToken } = authService.generateTokens({
          id: user.id,
          email: user.email,
        });

        // Optionally update refresh token storage
        authService.updateRefreshToken(user.id, newRefreshToken);

        // Send new tokens in response header or body
        res.setHeader('Authorization', `Bearer ${accessToken}`);
        return res.status(200).json({
          accessToken,
          refreshToken: newRefreshToken,
        });
      } catch (refreshError) {
        throw new authError.RefreshTokenError('Invalid refresh token');
      }
    } else {
      throw new authError.InvalidTokenError('Invalid token');
    }
  }
};
export default authMiddleware;
