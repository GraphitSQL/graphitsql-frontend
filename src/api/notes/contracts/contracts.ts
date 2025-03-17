import { TBaseResponse } from '@/api/types';

export type PreResolutionNote = {
  id: string;
  noteText: string;
  isResolved: boolean;
  createdBy?: {
    displayName: string;
    avatarColor: string;
  };
  createdAt: Date;
};
export type ListNotesResponse = {
  count: number;
  notes: Array<PreResolutionNote>;
};

export type CreateNoteRequest = {
  noteText: string;
  projectId: string;
  isResolved: boolean;
};

export type CreateNoteResponse = PreResolutionNote;

export type DeleteNoteResponse = TBaseResponse;

export type UpdateNoteOptions = {
  isResolved: boolean;
};
export type UpdateNoteRequest<T> = {
  [Property in keyof T]: string | boolean;
};
export type UpdateNoteResponse = TBaseResponse;
