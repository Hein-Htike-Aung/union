import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AuthService {
  static validateUser = async <T extends { id: number; password: string }>(
    targetObj: T,
    password: string,
  ) => {
    return bcrypt.compareSync(password, targetObj.password);
  };

  static generateAccessToken = <T extends { id: number; password: string }>(
    targetObj: T,
  ) => {
    const access_token = jwt.sign(
      targetObj,
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_EXPIRATION,
      },
    );

    return access_token;
  };

  static encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(
      process.env.SALT ? +process.env.SALT : 10,
    );

    return bcrypt.hashSync(password, salt);
  };
}
