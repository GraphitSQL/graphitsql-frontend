export type TUser = {
  id: string;
  email: string;
  about?: string;
  avatarColor: string;
  displayName: string;
};

export type OutletContextProps = {
  currentUser: TUser | null;
  fetchUser: () => Promise<void>;
};
