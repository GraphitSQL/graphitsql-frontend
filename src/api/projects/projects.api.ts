import { AxiosResponse } from 'axios';
import axiosInstance from '../axios-setup';
import { API_ROUTES } from '../constants';
import { CreateProjectRequest, CreateProjectResponse, DeleteProjectResponse, ListProjectsResponse } from './contracts';

export const getProjectListRequest = async ({
  skip,
  take,
  search,
}: {
  skip: number;
  take: number;
  search?: string;
}): Promise<ListProjectsResponse> => {
  try {
    const { data } = await axiosInstance.get<any, AxiosResponse<ListProjectsResponse>>(API_ROUTES.projects.list(), {
      params: { skip, take, search },
    });
    return data;
  } catch (e) {
    console.error('error on list projects request', e);
    throw e;
  }
};

export const createProjectRequest = async (payload: CreateProjectRequest): Promise<CreateProjectResponse> => {
  try {
    const { data } = await axiosInstance.post<any, AxiosResponse<CreateProjectResponse>>(
      API_ROUTES.projects.create(),
      payload
    );
    return data;
  } catch (e) {
    console.error('error on create project request', e);
    throw e;
  }
};

export const deleteProjectRequest = async (id: string): Promise<DeleteProjectResponse> => {
  try {
    const { data } = await axiosInstance.delete<any, AxiosResponse<DeleteProjectResponse>>(
      API_ROUTES.projects.delete(id)
    );
    return data;
  } catch (e) {
    console.error('error on delete project request', e);
    throw e;
  }
};
