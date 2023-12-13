import { type GetUserResponse } from '@/types';
import { API_URL, DEFAULT_DATA, NOT_FOUND, RATE_LIMITED } from './constants';

export default async function getUserData(username: string): Promise<GetUserResponse> {
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
