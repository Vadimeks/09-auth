// types/user.ts
export type User = {
  id: string;
  email: string;
  username: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username?: string;
};
