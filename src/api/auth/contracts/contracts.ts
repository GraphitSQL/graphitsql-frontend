export type AccessRefreshTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = AccessRefreshTokens;


export type GetTokenForRegistrationRequest = {
  email: string,
  password: string,
  userName: string,
  avatarColor: string
};
export type GetTokenForRegistrationResponse = string;


export type RegisterRequest = {
  code: string;
};
export type RegisterResponse = AccessRefreshTokens;


export type RefreshResponse = AccessRefreshTokens;


export type ResendVerificationCodeResponse = string;
