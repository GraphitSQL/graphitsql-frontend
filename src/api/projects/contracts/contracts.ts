import { TBaseResponse } from '@/api/types';

export type PreResolutionListProject = {
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
  projects: Array<PreResolutionListProject>;
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

export type DeleteProjectResponse = TBaseResponse;
