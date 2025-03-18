import { AxiosResponse } from 'axios';
import axiosInstance from '../axios-setup';
import { API_ROUTES } from '../constants';
import {
  CreateProjectRequest,
  CreateProjectResponse,
  DeleteProjectResponse,
  GetProjectDataResponse,
  GetProjectResponse,
  ListProjectsResponse,
  UpdateProjectDataRequest,
  UpdateProjectDataResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from './contracts';

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

export const updateProjectRequest = async ({
  payload,
  params,
}: UpdateProjectRequest): Promise<UpdateProjectResponse> => {
  try {
    const { data } = await axiosInstance.post<any, AxiosResponse<UpdateProjectResponse>>(
      API_ROUTES.projects.update(params.id),
      payload
    );
    return data;
  } catch (e) {
    console.error('error on update project request', e);
    throw e;
  }
};

export const getProjectRequest = async (id: string): Promise<GetProjectResponse> => {
  try {
    const { data } = await axiosInstance.get<any, AxiosResponse<GetProjectResponse>>(API_ROUTES.projects.get(id));
    return data;
  } catch (e) {
    console.error('error on get project request', e);
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

export const generateInvitationLinkRequest = async (projectId: string): Promise<string> => {
  try {
    const { data } = await axiosInstance.get<any, AxiosResponse<string>>(API_ROUTES.projects.generateInvitationLink(), {
      params: { projectId },
    });
    return data;
  } catch (e) {
    console.error('error on generate link request', e);
    throw e;
  }
};

export const joinToProjectRequest = async (token: string): Promise<string> => {
  try {
    const { data } = await axiosInstance.post<any, AxiosResponse<string>>(API_ROUTES.projects.joinToProject(), null, {
      headers: {
        'invitation-token': token,
      },
    });
    return data;
  } catch (e) {
    console.error('error on join to project request', e);
    throw e;
  }
};

export const updateProjectDataRequest = async (
  payload: UpdateProjectDataRequest
): Promise<UpdateProjectDataResponse> => {
  try {
    const { data } = await axiosInstance.post<any, AxiosResponse<UpdateProjectDataResponse>>(
      API_ROUTES.projects.saveChanges(),
      payload.payloadData,
      {
        params: { id: payload.projectId },
      }
    );
    return data;
  } catch (e) {
    console.error('error on saving project data changes request', e);
    throw e;
  }
};

export const getProjectDataRequest = async (id: string): Promise<GetProjectDataResponse> => {
  try {
    const { data } = await axiosInstance.get<any, AxiosResponse<GetProjectDataResponse>>(
      API_ROUTES.projects.getProjectData(),
      {
        params: { id },
      }
    );
    return data;
  } catch (e) {
    console.error('error on list projects request', e);
    throw e;
  }
};
