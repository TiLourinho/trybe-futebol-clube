import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const verifyJWT = (token: string) => {
  const result = jwt.verify(token, secret);

  return result;
};

export default verifyJWT;
