import type { UserDataResponse, UserProfile } from '@/types';
import 'server-only';
import { API_URL, DEFAULT_DATA, RATE_LIMITED } from './constants';

export default async function getUserData(username: string): Promise<UserDataResponse> {
  try {
    const res = await fetch(`${API_URL}${username}`, { cache: 'force-cache' });

    if (res.status === 404) {
      return { data: DEFAULT_DATA, error: true, message: 'Not Found' };
    }

    if (res.status === 429 || res.statusText.includes(RATE_LIMITED)) {
      return { data: DEFAULT_DATA, error: true, message: 'Rate Limited' };
    }

    const rawData = await res.json();

    const userData: UserProfile = {
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

    return { data: userData, error: false };
  } catch (error) {
    return {
      data: DEFAULT_DATA,
      error: true,
      message: (error as Error).message,
    };
  }
}
