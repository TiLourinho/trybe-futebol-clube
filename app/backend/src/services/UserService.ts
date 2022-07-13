import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { IUser, IUserM, IUserS } from '../protocols';
import ErrorHandler from '../utils/errorHandler';
import generateJWT from '../utils/generateJWT';
import verifyJWT from '../utils/verifyJWT';

class UserService implements IUserS {
  constructor(private model: IUserM) {
    this.model = model;
  }

  async login(data: IUser): Promise<string> {
    const user = await this.model.login({
      where: { email: data.email },
    });

    if (!user || user.email !== data.email) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const checkPassword = await bcrypt.compare(data.password as string, user.password as string);

    if (!checkPassword) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const payload = { id: user.id, username: user.username, role: user.role, email: user.email };
    const token = generateJWT(payload);

    return token;
  }

  async validate(token: string): Promise<string> {
    const decoded = verifyJWT(token) as IUser;

    if (!decoded || !decoded.id) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Failed JWT verification');
    }

    const user = await this.model.getById(decoded.id as number);

    if (!user) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'User not found');
    }

    const { role } = user;
    return role as string;
  }
}

export default UserService;
