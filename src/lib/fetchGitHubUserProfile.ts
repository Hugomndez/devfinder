import 'server-only';

import type { DataResponse, GitHubUserProfile } from '@/types';
import { API_URL, DEFAULT_DATA } from './constants';

export default async function fetchGitHubUserProfile(username: string): Promise<DataResponse> {
  try {
    const res = await fetch(`${API_URL}${username}`);

    if (res.status === 404) {
      return { status: 'error', data: DEFAULT_DATA, message: 'Not Found' };
    }

    if (res.status === 403 && res.headers.get('X-RateLimit-Remaining') === '0') {
      return { status: 'error', data: DEFAULT_DATA, message: 'Rate Limited' };
    }

    const rawData = await res.json();

    const data: GitHubUserProfile = {
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

    return { status: 'success', data };
  } catch (error) {
    return {
      status: 'error',
      data: DEFAULT_DATA,
      message: 'Please try again',
    };
  }
}
