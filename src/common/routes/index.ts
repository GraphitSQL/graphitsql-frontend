const Routing = {
  home: {
    route: () => '/home',
    isAuth: true,
  },
  signIn: {
    route: () => '/sign-in',
    isAuth: false,
  },
  signUp: {
    route: () => '/sign-up',
    isAuth: false,
  },
};

export { Routing };
