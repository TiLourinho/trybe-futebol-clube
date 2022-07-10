import Model from '../database/models/User';
import { IUser, IUserM } from '../protocols/index';

class UserRepository implements IUserM {
  constructor(private model = Model) {
    this.model = model;
  }

  async login(data: object): Promise<IUser | null> {
    const user = await this.model.findOne(data);

    return user as IUser;
  }

  async getById(id: number): Promise<IUser | null> {
    const user = await this.model.findByPk(id);

    return user;
  }
}

export default UserRepository;
