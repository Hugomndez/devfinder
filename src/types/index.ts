export type UserDTO = {
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

export type GetUserResponse = {
  data: UserDTO;
  notFound: boolean;
  rateLimited: boolean;
  error?: string;
};

export type ServerState = {
  status: 'initial' | 'success' | 'error';
  message: string;
  data: { username: string };
};
