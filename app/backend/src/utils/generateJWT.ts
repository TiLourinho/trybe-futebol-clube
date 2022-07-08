import * as jwt from 'jsonwebtoken';
import { IUser } from '../protocols/index';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const config: object = {
  algorithm: 'HS256',
};

const generateJWT = (payload: IUser) => {
  const token = jwt.sign(payload, secret, config);

  return token;
};

export default generateJWT;
