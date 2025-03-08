import { TBaseResponse } from '@/api/types';
import { TUser } from '@/common/types/types';

export type GetMeResponse = TUser;

export type UpdateProfileRequest = {
  email?: string;
  about?: string;
  displayName?: string;
  avatarColor: string;
};

export type UpdateProfileResponse = TBaseResponse;
