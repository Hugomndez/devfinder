export type UserData = {
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
  data: UserData;
  notFound: boolean;
  rateLimited: boolean;
  error?: string;
};
