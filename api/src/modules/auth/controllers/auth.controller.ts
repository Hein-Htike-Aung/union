import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import User from '../../../models/user.model';
import errorResponse from '../../../utils/errorResponse';
import AuthService from '../services/auth.service';
import successResponse from '../../../utils/successResponse';
import Role from '../../../models/role.model';
import Township from '../../../models/township.model';
import District from '../../../models/district.model';
import State from '../../../models/state.model';

export default class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
        include: [
          {
            model: Role,
            as: 'role',
          },
          {
            model: Township,
            as: 'township',
            include: [
              {
                model: District,
                as: 'district',
                include: [
                  {
                    model: State,
                    as: 'state',
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!user) return errorResponse(res, 401, 'Invalid Credentials');

      const validatedUser = await AuthService.validateUser<User>(
        user,
        password,
      );

      if (validatedUser) {
        const access_token = AuthService.generateAccessToken<User>(
          user.dataValues,
        );

        return successResponse(res, null, {
          user,
          access_token,
        });
      } else return errorResponse(res, 401, 'Invalid Credentials');
    } catch (error) {
      handleError(res, error);
    }
  };
}
