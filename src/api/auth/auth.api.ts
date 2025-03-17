import { AxiosResponse } from './../../../node_modules/axios/index.d';
import axiosInstance from '../axios-setup';
import { API_ROUTES } from '../constants';
import {
  ChangePasswordRequest,
  ChangePassworResponse,
  GetTokenForRegistrationRequest,
  GetTokenForRegistrationResponse,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
  ResendVerificationCodeResponse,
} from './contracts';
import { LocalStorageItem } from '@/common/constants';
import axios from 'axios';
import { Routing, windowOpen } from '@/common/routes';

export const logIn = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post<LoginRequest, AxiosResponse<LoginResponse>>(API_ROUTES.auth.login(), {
      email,
      password,
    });
    return data;
  } catch (e) {
    console.error('error on login request', e);
    throw e;
  }
};

export const getTokenForRegistration = async (
  payload: GetTokenForRegistrationRequest
): Promise<GetTokenForRegistrationResponse> => {
  try {
    const { data } = await axiosInstance.post<
      GetTokenForRegistrationRequest,
      AxiosResponse<GetTokenForRegistrationResponse>
    >(API_ROUTES.auth.getTokenForRegistration(), payload);
    return data;
  } catch (e) {
    console.error('error on getTokenForRegistration request', e);
    throw e;
  }
};

export const verifyEmailAddress = async (payload: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const { data } = await axiosInstance.post<RegisterRequest, AxiosResponse<RegisterResponse>>(
      API_ROUTES.auth.register(),
      payload,
      {
        headers: {
          'registration-token': window.localStorage.getItem(LocalStorageItem.TOKEN_FOR_REGISTRATION),
        },
      }
    );
    return data;
  } catch (e) {
    console.error('error on verifyEmailAddress request', e);
    throw e;
  }
};

export const resendVerificationCodeRequest = async (): Promise<ResendVerificationCodeResponse> => {
  try {
    const { data } = await axiosInstance.get<string, AxiosResponse<ResendVerificationCodeResponse>>(
      API_ROUTES.auth.resendVerificationCode(),
      {
        headers: {
          'registration-token': window.localStorage.getItem(LocalStorageItem.TOKEN_FOR_REGISTRATION),
        },
      }
    );
    return data;
  } catch (e) {
    console.error('error on verifyEmailAddres request', e);
    throw e;
  }
};

export const logoutRequest = async (): Promise<void> => {
  try {
    await axiosInstance.get<string, AxiosResponse<void>>(API_ROUTES.auth.logout());
  } catch (e) {
    console.error('error on logoutRequest request', e);
    throw e;
  }
};

export const refreshAccessToken = async (baseUrl: string): Promise<RefreshResponse | null> => {
  try {
    const { data } = await axios.get<string, AxiosResponse<RefreshResponse>>(
      `${baseUrl}${API_ROUTES.auth.refreshTokens()}`,
      {
        headers: {
          Refresh: window.localStorage.getItem(LocalStorageItem.REFRESH_TOKEN),
        },
      }
    );
    window.localStorage.setItem(LocalStorageItem.ACCESS_TOKEN, data.accessToken);
    window.localStorage.setItem(LocalStorageItem.REFRESH_TOKEN, data.refreshToken);
    return data;
  } catch (e) {
    console.error('error on refreshAccessToken request', e);
    window.localStorage.removeItem(LocalStorageItem.ACCESS_TOKEN);
    window.localStorage.removeItem(LocalStorageItem.REFRESH_TOKEN);
    windowOpen(Routing.signIn.route());
    return null;
  }
};

export const changePasswordRequest = async (payload: ChangePasswordRequest): Promise<ChangePassworResponse> => {
  try {
    const { data } = await axiosInstance.post<ChangePasswordRequest, AxiosResponse<ChangePassworResponse>>(
      API_ROUTES.auth.changePassword(),
      payload
    );
    return data;
  } catch (e) {
    console.error('[Change Password Request] error:', e);
    throw e;
  }
};
