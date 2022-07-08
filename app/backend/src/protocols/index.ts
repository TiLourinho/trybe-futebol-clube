export interface IUser {
  id?: number;
  username?: string;
  role?: string;
  email: string;
  password?: string;
}

export interface IUserM {
  login(data: object): Promise<IUser | null>
}

export interface IUserS {
  login(data: object): Promise<string>
}

export interface Error {
  status?: number;
  message?: string;
}
