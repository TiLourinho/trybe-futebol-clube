export interface IUser {
  id?: number;
  username?: string;
  role?: string;
  email: string;
  password?: string;
}

export interface IUserM {
  login(data: object): Promise<IUser | null>
  getById(id: number): Promise<IUser | null>
}

export interface IUserS {
  login(data: object): Promise<string>
  validate(token: string): Promise<string>
}

export interface IError {
  status?: number;
  message?: string;
}

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamM {
  getAll(): Promise<ITeam[] | null>
  getById(id: number): Promise<ITeam | null>
}

export interface ITeamS {
  getAll(): Promise<ITeam[]>
  getById(id: number): Promise<ITeam>
}
