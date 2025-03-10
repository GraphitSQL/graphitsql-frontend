import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomePage } from '../../pages/home-page';
import { SignInPage } from '../../pages/sign-in-page';
import { SignUpPage } from '../../pages/sign-up-page';
import { AuthLayout } from '../components/layouts';
import { PofilePage } from '../../pages/profile-page';
// import { ProjectPage } from '../../pages/project-page';
import { ProjectPageWrapper } from '@/pages/project-page/wrapper';

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
  projects: {
    route: (id: string | number) => `/projects/${id}`,
    isAuth: true,
  },
  profile: {
    route: () => '/profile',
    isAuth: true,
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
    basename: '/',
  }
);
