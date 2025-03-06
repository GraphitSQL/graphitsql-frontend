import { AxiosResponse } from './../../../node_modules/axios/index.d';
import axiosInstance from '../axios-setup';
import { API_ROUTES } from '../constants';
import { LoginRequest, LoginResponse } from './contracts';

export const logIn = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post<LoginRequest, AxiosResponse<LoginResponse>>(
      API_ROUTES.auth.login(),
      {
        email,
        password,
      },
    );
    return data;
  } catch (e) {
    console.error('error on login request',e);
    throw e;
  }
};
