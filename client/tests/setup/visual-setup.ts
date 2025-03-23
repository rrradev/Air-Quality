import { request } from '@playwright/test';
import { authToken } from '../../../config/keys';
import testData from '../data/visual-data.json';

export default async function visualSetup() {
  const api = await request.newContext({
    baseURL: 'http://localhost:3000',
    extraHTTPHeaders: {
      'x-auth-token': authToken,
    },
  });

  for (const [i, data] of testData.entries()) {
    const res = await api.post('/api/data', { data });

    if (!res.ok()) {
      throw new Error(`POST ${i + 1} failed: ${res.status()} - ${await res.text()}`);
    }
  }
}

