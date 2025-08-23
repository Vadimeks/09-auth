// types/user.ts
export type User = {
  id: string;
  email: string;
  username?: string;
  avatar?: string | null;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};
