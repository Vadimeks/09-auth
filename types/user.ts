// types/user.ts
export type User = {
  id: string;
  email: string;
  username?: string; // Зробім username апцыянальным, бо бэкенд можа яго не вяртаць
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};
