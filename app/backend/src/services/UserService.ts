import * as bcrypt from 'bcryptjs';
import { IUser, IUserM, IUserS } from '../protocols';
import generateJWT from '../utils/generateJWT';

class UserService implements IUserS {
  constructor(private model: IUserM) {
    this.model = model;
  }

  async login(data: IUser): Promise<string> {
    const user = await this.model.login({
      where: { email: data.email },
    });

    if (!user || user.email !== data.email) {
      throw new Error('User doesn\'t exist');
    }

    const checkPassword = await bcrypt.compare(data.password as string, user.password as string);

    if (!checkPassword) throw new Error('Invalid password');

    const payload = { username: user.username, email: user.email };
    const token = generateJWT(payload);

    return token;
  }
}

export default UserService;
