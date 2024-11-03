'use server';

import getUserData from '@/lib/getUserData';
import type { ServerState } from '@/types';
import { z } from 'zod';

const schema = z.string().min(1);

export async function searchUserAction(_: unknown, payload: FormData): Promise<ServerState> {
  const username = payload.get('username');
  const { error, data } = schema.safeParse(username);

  if (error) {
    return { state: 'error', message: 'Invalid Input', data: { username: username as string } };
  }

  const res = await getUserData(data);

  if (res.status === 'error') {
    return { state: 'error', message: res.message, data: { username: username as string } };
  }

  return { state: 'success', data: { username: username as string } };
}
