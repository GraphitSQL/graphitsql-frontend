import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomePage } from '../../pages/home-page';
import { SignInPage } from '../../pages/sign-in-page';
import { SignUpPage } from '../../pages/sign-up-page';
import { AuthLayout } from '../components/layouts';

export const Routing = {
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
    route: (id: string | number) => `/sign-up/${id}`,
    isAuth: false,
  },
};

export const routers = createBrowserRouter([
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
        path: '',
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);
