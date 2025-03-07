export const API_ROUTES = {
  health: () => '/health',
  auth: {
    login: () => '/auth/login',
    getTokenForRegistration: () => '/auth/get-token-for-registration',
    register: () => '/auth/register',
    resendVerificationCode: () => '/auth/resend-verification-code',
    logout: () => '/auth/logout',
    refreshTokens: () => '/auth/refresh',
  },
  users: {
    me: () => '/users/me',
  },
};
