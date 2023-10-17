export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean | null;
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
  id? : any | null;
  name?: string | null,
  date: Date ;
}
export interface IEnvironment{
  production: boolean,
  apiUrl: string
  dbUrl: string
}
