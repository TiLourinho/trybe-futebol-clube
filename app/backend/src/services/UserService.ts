import * as bcrypt from 'bcryptjs';
import { IUser, IUserM, IUserS } from '../protocols';
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
      throw new Error('Invalid email');
    }

    const checkPassword = await bcrypt.compare(data.password as string, user.password as string);

    if (!checkPassword) throw new Error('Invalid password');

    const payload = { id: user.id, username: user.username, role: user.role, email: user.email };
    const token = generateJWT(payload);

    return token;
  }

  async validate(token: string): Promise<string> {
    const decoded = verifyJWT(token) as IUser;
    console.log('Service decoded', decoded);

    if (!decoded || !decoded.id) {
      throw new Error('Failed JWT verification');
    }

    const user = await this.model.getById(decoded.id as number);
    console.log('Service user', user);

    if (!user) {
      throw new Error('User doesn\'t exist');
    }

    const { role } = user;
    console.log('Service role', role);
    return role as string;
  }
}

export default UserService;
