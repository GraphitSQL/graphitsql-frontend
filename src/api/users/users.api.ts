import { AxiosResponse } from './../../../node_modules/axios/index.d';
import axiosInstance from '../axios-setup';
import { API_ROUTES } from '../constants';
import { GetMeResponse, UpdateProfileRequest, UpdateProfileResponse } from './contracts';

export const getMe = async (): Promise<GetMeResponse> => {
  try {
    const { data } = await axiosInstance.get<string, AxiosResponse<GetMeResponse>>(API_ROUTES.users.me());
    return data;
  } catch (e) {
    console.error('[GET ME]: error', e);
    throw e;
  }
};

export const updateProfileRequest = async (payload: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
  try {
    const { data } = await axiosInstance.post<UpdateProfileRequest, AxiosResponse<UpdateProfileResponse>>(
      API_ROUTES.users.updateCurrentUser(),
      payload
    );
    return data;
  } catch (e) {
    console.error('[UPDATE PROFILE]: error', e);
    throw e;
  }
};

export const deleteAccountRequest = async (): Promise<void> => {
  try {
    await axiosInstance.delete<UpdateProfileRequest, AxiosResponse<UpdateProfileResponse>>(
      API_ROUTES.users.deleteAccount()
    );
  } catch (e) {
    console.error('[DELETE PROFILE]: error', e);
    throw e;
  }
};
