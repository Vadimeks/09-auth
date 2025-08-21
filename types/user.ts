// types/user.ts
export type User = {
  id: string;
  email: string;
  userName: string;
};

export type LoginRequest = {
  email?: string;
  password?: string;
};

export type RegisterRequest = {
  userName?: string;
  email?: string;
  password?: string;
};
