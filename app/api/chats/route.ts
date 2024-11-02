import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<any> {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get('token');

  const BACKEND_URL = process.env.BACKEND_URL;
  if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not set');
  }

  const res = await axios.get(`${BACKEND_URL}/api/chat`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Response.json(res.data);
}
