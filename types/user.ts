// types/user.ts
export type User = {
  email: string;
  username: string;
  avatar: string;
};

export type UserLoginFormValues = {
  email: string;
  password: string;
};

export type UserRegisterFormValues = {
  email: string;
  password: string;
};
