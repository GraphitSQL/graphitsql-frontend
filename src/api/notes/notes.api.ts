import { AxiosResponse } from 'axios';
import axiosInstance from '../axios-setup';
import { API_ROUTES } from '../constants';
import {
  CreateNoteRequest,
  CreateNoteResponse,
  DeleteNoteResponse,
  ListNotesResponse,
  UpdateNoteRequest,
  UpdateNoteResponse,
} from './contracts';

export const getNoteListRequest = async ({
  skip,
  take,
  direction,
  projectId,
}: {
  skip: number;
  take: number;
  direction: 'ASC' | 'DESC';
  projectId: string;
}): Promise<ListNotesResponse> => {
  try {
    const { data } = await axiosInstance.get<any, AxiosResponse<ListNotesResponse>>(API_ROUTES.notes.list(), {
      params: { skip, take, direction, projectId },
    });
    return data;
  } catch (e) {
    console.error('error on list notes request', e);
    throw e;
  }
};

export const createNoteRequest = async (payload: CreateNoteRequest): Promise<CreateNoteResponse> => {
  try {
    const { data } = await axiosInstance.post<any, AxiosResponse<CreateNoteResponse>>(
      API_ROUTES.notes.create(),
      payload
    );
    return data;
  } catch (e) {
    console.error('error on create note request', e);
    throw e;
  }
};

export const updateNoteRequest = async <T>({
  payload,
  params,
}: {
  payload: UpdateNoteRequest<T>;
  params: { projectId: string; id: string };
}): Promise<UpdateNoteResponse> => {
  try {
    const { data } = await axiosInstance.post<any, AxiosResponse<UpdateNoteResponse>>(
      API_ROUTES.notes.update(params.id),
      payload,
      {
        params: { prpjectId: params.projectId },
      }
    );
    return data;
  } catch (e) {
    console.error('error on saving project data changes request', e);
    throw e;
  }
};

export const deleteNoteRequest = async (id: string): Promise<DeleteNoteResponse> => {
  try {
    const { data } = await axiosInstance.delete<any, AxiosResponse<DeleteNoteResponse>>(API_ROUTES.notes.delete(id));
    return data;
  } catch (e) {
    console.error('error on delete project request', e);
    throw e;
  }
};
