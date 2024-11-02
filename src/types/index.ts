export type UserProfile = {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type UserDataResponse = {
  status: 'success' | 'error';
  data: UserProfile;
} & ({ status: 'success' } | { status: 'error'; message: string });

export type ServerState = {
  state: 'initial' | 'success' | 'error';
  data: { username: string };
} & (InitialState | SuccessState | ErrorState);

type InitialState = {
  state: 'initial';
};

type SuccessState = {
  state: 'success';
};

type ErrorState = {
  state: 'error';
  message: string;
};
