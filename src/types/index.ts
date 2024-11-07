export type GitHubUserProfile = {
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

export type DataResponse = {
  status: 'success' | 'error';
  data: GitHubUserProfile;
} & (SuccessState | ErrorState);

type SuccessState = {
  status: 'success';
};

type ErrorState = {
  status: 'error';
  message: string;
};
