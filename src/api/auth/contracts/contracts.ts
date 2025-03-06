export type AccessRefreshTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = AccessRefreshTokens;
