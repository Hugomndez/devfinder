const API_URL = 'https://api.github.com/users/';
const NOT_FOUND = 'Not Found';
const RATE_LIMITED = 'API rate limit exceeded';
const DEFAULT_DATA = {
  login: 'octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  name: 'The Octocat',
  company: '@github',
  blog: 'https://github.blog',
  location: 'San Francisco',
  bio: null,
  twitter_username: null,
  public_repos: 8,
  followers: 11316,
  following: 9,
  created_at: '2011-01-25T18:44:36Z',
};

export default async function getUserData(username: string) {
  try {
    const res = await fetch(`${API_URL}${username}`);
    const rawData = await res.json();

    if (rawData.message === NOT_FOUND) {
      return { data: DEFAULT_DATA, notFound: true, rateLimited: false };
    } else if (rawData.message && rawData.message.includes(RATE_LIMITED)) {
      return { data: DEFAULT_DATA, notFound: false, rateLimited: true };
    }

    const filteredData = {
      login: rawData.login,
      avatar_url: rawData.avatar_url,
      name: rawData.name,
      bio: rawData.bio,
      public_repos: rawData.public_repos,
      company: rawData.company,
      blog: rawData.blog,
      location: rawData.location,
      twitter_username: rawData.twitter_username,
      followers: rawData.followers,
      following: rawData.following,
      created_at: rawData.created_at,
    };

    return { data: filteredData, notFound: false, rateLimited: false };
  } catch (error) {
    return {
      data: DEFAULT_DATA,
      error: (error as Error).message,
      notFound: false,
      rateLimited: false,
    };
  }
}
