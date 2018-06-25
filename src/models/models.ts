
export type UserInfo = {
  id: string;
  name: string;
  email: string;
  img: string;
  role: string;
}

export type NewUser = {
  name?: string;
  password?: string;
  email?: string;
  img?: string;
  city?: string;
}

export type Login = {
  email: string;
  password: string;
}

export type Tour = {
  title: string;
  description: string;
  date: number;
  image: string;
  img?: string;
  days: [''];
  buddy: string;
  city: string;
  time: string;
}

export type Rating = {
  votes: number;
  rate: number;
  points: number;
}

export type Follow = {
  id: string;
  name: string;
  img: string;
}
