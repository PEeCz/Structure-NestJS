export interface IUser {
  id: string;
  email?: string;
  first_name?: string;
  family_name?: string;
  given_name?: string;
  middle_name?: string;
  provider?: string;
  picture?: string;
  gender?: string;
  access_token: string;
}

export interface IToken {
  access_token: string
  token_type: string
  expires_in: number | string
}

export interface IItem {
  name: string,
  id: string,
  iat: number,
  exp: number
}