import { Request, Response } from 'express';
import handleError from '../../../utils/handleError';
import User from '../../../models/user.model';
import alreadyExists from '../../../utils/alreadyExists';
import AuthService from '../../auth/services/auth.service';
import successResponse from '../../../utils/successResponse';
import { get } from 'lodash';
import UserService from '../services/user.service';
import isDuplicatedRecord from '../../../utils/isDuplicatedRecord';
import Role from '../../../models/role.model';
import modelNotFound from '../../../utils/modelNotFound';
import getPaginationData from '../../../utils/getPaginationData';
import Township from '../../../models/township.model';
import District from '../../../models/district.model';
import State from '../../../models/state.model';
import likeSearch from '../../../utils/likeSearch';
import { Op } from 'sequelize';

export default class UserController {
  static createUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({
        where: {
          email,
        },
      });

      if (existingUser) return alreadyExists(res);

      const hashedPassword = await AuthService.encryptPassword(password);

      await User.create({
        ...req.body,
        password: hashedPassword,
      });

      return successResponse(res, 'Created');
    } catch (error) {
      handleError(res, error);
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    try {
      const user_id = get(req.params, 'user_id');

      const { email, password } = req.body;

      await UserService.findUserById(Number(user_id));

      const existingUser = await User.findOne({
        where: {
          email,
        },
      });

      if (isDuplicatedRecord(existingUser, user_id)) return alreadyExists(res);

      if (password) {
        const hashedPassword = await AuthService.encryptPassword(password);

        await User.update(
          {
            ...req.body,
            password: hashedPassword,
          },
          {
            where: {
              id: user_id,
            },
          },
        );
      } else {
        await User.update(
          {
            ...req.body,
          },
          {
            where: {
              id: user_id,
            },
          },
        );
      }

      return successResponse(res, 'Updated');
    } catch (error) {
      handleError(res, error);
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    try {
      const user_id = get(req.params, 'user_id');

      await UserService.findUserById(Number(user_id));

      await User.destroy({
        where: {
          id: user_id,
        },
      });

      return successResponse(res, 'Deleted');
    } catch (error) {
      handleError(res, error);
    }
  };

  static userById = async (req: Request, res: Response) => {
    try {
      const user_id = get(req.params, 'user_id');

      const user = await User.findByPk(user_id, {
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

      if (!user) return modelNotFound(res, 'User');

      return successResponse(res, null, { user });
    } catch (error) {
      handleError(res, error);
    }
  };

  static userList = async (req: Request, res: Response) => {
    try {
      const { offset, limit } = getPaginationData(req.query);
      const { search } = req.query;

      const township_ids: number[] = [];

      const townships = await Township.findAll({
        where: {
          township: {
            [Op.like]: likeSearch(search),
          },
        },
      });

      townships.forEach((t) => township_ids.push(t.id));

      const { rows: users, count } = await User.findAndCountAll({
        offset,
        limit,
        where: {
          [Op.or]: {
            username: {
              [Op.like]: likeSearch(search),
            },
            email: {
              [Op.like]: likeSearch(search),
            },
            township_id: township_ids,
          },
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

      return successResponse(res, null, { users, count });
    } catch (error) {
      handleError(res, error);
    }
  };
}
