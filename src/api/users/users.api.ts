
import { AxiosResponse } from './../../../node_modules/axios/index.d';
import axiosInstance from '../axios-setup';
import { API_ROUTES } from '../constants';
import { GetMeResponse } from './contracts';


export const getMe = async (): Promise<GetMeResponse> => {
  try {
    const { data } = await axiosInstance.get<string, AxiosResponse<GetMeResponse>>(
      API_ROUTES.users.me()
    );
    return data;
  } catch (e) {
    console.error('error on get me request',e);
    throw e;
  }
};
