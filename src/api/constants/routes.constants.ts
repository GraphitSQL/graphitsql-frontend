export const API_ROUTES = {
  health: () => '/health',
  auth: {
    login: () => '/auth/login',
    getTokenForRegistration: () => '/auth/get-token-for-registration',
    register: () => '/auth/register',
    resendVerificationCode: () => '/auth/resend-verification-code',
    logout: () => '/auth/logout',
    refreshTokens: () => '/auth/refresh',
    changePassword: () => '/auth/change-password',
  },
  users: {
    me: () => '/users/me',
    updateCurrentUser: () => '/users/update',
    deleteAccount: () => '/users/delete-account',
  },
  projects: {
    list: () => `/projects/list`,
    create: () => 'projects/create',
    delete: (id: string) => `/projects/delete?id=${id}`,
    generateInvitationLink: () => '/projects/invitation-link',
    joinToProject: () => '/projects/join-to-project',
  },
};
