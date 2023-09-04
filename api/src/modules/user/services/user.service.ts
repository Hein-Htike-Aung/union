import User from '../../../models/user.model';
import AppError from '../../../utils/appError';

export default class UserService {
  static findUserById = async (id: number) => {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new AppError('User not found', 404);

    return user;
  };
}
