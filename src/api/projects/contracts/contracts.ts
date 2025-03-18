import { TBaseResponse } from '@/api/types';

export type PreResolutionProject = {
  id: string;
  title: string;
  isPublic: boolean;
  createdBy?: {
    id: string;
    displayName: string;
    avatarColor: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
export type ListProjectsResponse = {
  count: number;
  projects: Array<PreResolutionProject>;
};

export type CreateProjectRequest = {
  title: string;
  isPublic: boolean;
};

export type CreateProjectResponse = {
  id: string;
  title: string;
  isPublic: boolean;
  createdBy: {
    id: string;
    avatarColor: string;
    displayName: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateProjectRequest = {
  params: {
    id: string;
  };
  payload: {
    title?: string;
  };
};

export type UpdateProjectResponse = TBaseResponse;

export type DeleteProjectResponse = TBaseResponse;

export type UpdateProjectDataRequest = {
  payloadData: {
    nodes: any[];
    edges: any[];
  };
  projectId: string;
};

export type UpdateProjectDataResponse = TBaseResponse;

export type GetProjectDataResponse = {
  data: {
    nodes: any[];
    edges: any[];
  };
  isScratch: boolean;
};

export type GetProjectResponse = PreResolutionProject;
