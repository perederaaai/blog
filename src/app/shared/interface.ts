export interface IUserData {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface IFBTokens {
  idToken: string;
  localToken: string;
  expiresIn: string;
}

export interface IPost {
  title: string;
  text: string;
  author: string;
  id? : any;
  name?: string,
  date: Date;
}
export interface IEnvironment{
  production: boolean,
  apiKey: string
  dbUrl: string
}
