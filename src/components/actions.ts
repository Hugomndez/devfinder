'use server';

import getUserData from '@/lib/getUserData';
import type { ServerState } from '@/types';

export default async function userAction(_: unknown, payload: FormData): Promise<ServerState> {
  const username = payload.get('username') as string;

  const { notFound, rateLimited } = await getUserData(username);

  if (notFound || rateLimited) {
    const message = notFound ? 'No Results' : 'Rate limited';
    return {
      status: 'error',
      message,
      data: { username },
    };
  }

  return {
    status: 'success',
    message: '',
    data: { username },
  };
}
