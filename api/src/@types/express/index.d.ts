declare namespace Express {
  export interface Request {
    authToken: string | null,
    authId?: string,
    isAuth: boolean,
    userId: string
  }
}