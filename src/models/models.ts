
export type UserInfo = {
  id: string;
  name: string;
  email: string;
  img: string;
  role: string;
}

export type NewUser = {
  name: string;
  password: string;
  email: string;
  img?: string;
  role: string;
}

export type Login = {
  email: string;
  password: string;
}
