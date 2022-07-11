export interface IError {
  status?: number;
  message?: string;
}

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

export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

export interface IMatchM {
  getAll(query: boolean | null): Promise<IMatch[] | null>
  create(match: object): Promise<IMatch>
}

export interface IMatchS {
  getAll(query: boolean | null): Promise<IMatch[]>
  create(match: object): Promise<object>
}
