import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from '../../pages/home-page';
import SignInPage from '../../pages/sign-in-page';
import SignUpPage from '../../pages/sign-up-page';
import { AuthLayout } from '../components/layouts';
import { PofilePage } from '../../pages/profile-page';
import ProjectPageWrapper from '@/pages/project-page/wrapper';
import JoinProjectPage from '@/pages/join-project-page';
import { ForgotPasswordPage } from '@/pages/forgot-password';

const APP_BASE_URL = import.meta.env.VITE_APP_BASENAME;

export const Routing: Record<string, { route: (arg?: any) => string; isAuth: boolean }> = {
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
  forgotPassword: {
    route: () => '/forgot-password',
    isAuth: false,
  },
  projects: {
    route: (id: string | number) => `/projects/${id}`,
    isAuth: true,
  },
  profile: {
    route: () => '/profile',
    isAuth: true,
  },
  terms: {
    route: () => '/terms/terms.pdf',
    isAuth: false,
  },
  join: {
    route: (token: string) => `/join/${token}`,
    isAuth: false,
  },
};

export const routers = createBrowserRouter(
  [
    {
      path: Routing.signIn.route(),
      element: <SignInPage />,
    },
    {
      path: Routing.signUp.route(),
      element: <SignUpPage />,
    },
    {
      path: Routing.join.route(':token'),
      element: <JoinProjectPage />,
    },
    {
      path: Routing.forgotPassword.route(),
      element: <ForgotPasswordPage />,
    },
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: Routing.home.route(),
          element: <HomePage />,
        },
        {
          path: Routing.profile.route(),
          element: <PofilePage />,
        },
        {
          path: Routing.projects.route(':id'),
          element: <ProjectPageWrapper />,
        },
        {
          path: '',
          element: <Navigate to="/home" replace />,
        },
      ],
    },
  ],
  {
    basename: APP_BASE_URL ?? '/',
  }
);

export const windowOpen = (routerPath: string, target?: string, features?: string) => {
  window.open(`${window.location.origin}/${APP_BASE_URL}${routerPath}`, target, features);
};
