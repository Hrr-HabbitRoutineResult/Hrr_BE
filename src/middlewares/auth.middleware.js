import jwt from 'jsonwebtoken';
import authService from '../services/auth.service.js';
import authError from '../errors/auth.error.js';
import { StatusCodes } from 'http-status-codes';

export const authMiddleware = async (req, res, next) => {
  const auth_header = req.headers['authorization'];
  const token = auth_header && auth_header.split(' ')[1];
  if (!token) {
    next(new authError.AccessTokenError('Access token required'));
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    // Token expired
    if (err.name === 'TokenExpiredError') {
      const refresh_token = req.body.refreshToken;

      if (!refresh_token) {
        next(new authError.TokenExpiredError('Refresh token required'));
      }

      try {
        // Verify refresh token
        const user = authService.verifyRefreshToken(refresh_token);
        const { access_token, refresh_token: new_refresh_token } = authService.generateTokens({
          id: user.id,
          email: user.email,
        });

        // Optionally update refresh token storage
        authService.updateRefreshToken(user.id, new_refresh_token);

        // Send new tokens in response header or body
        res.setHeader('Authorization', `Bearer ${access_token}`);
        return res.success(
          {
            access_token,
            refreshToken: new_refresh_token,
          },
          StatusCodes.OK,
        );
      } catch (refreshError) {
        next(new authError.RefreshTokenError('Invalid refresh token'));
      }
    } else {
      next(new authError.InvalidTokenError('Invalid token'));
    }
  }
};
export default authMiddleware;
