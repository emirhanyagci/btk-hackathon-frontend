import axios from 'axios';
import { NextRequest } from 'next/server';
export async function GET(req: NextRequest): Promise<any> {
  const searchParams = req.nextUrl.searchParams;
  const chatId = searchParams.get('chatId');
  const token = searchParams.get('token');

  const BACKEND_URL = process.env.BACKEND_URL;
  if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not set');
  }

  const res = await axios.get(`${BACKEND_URL}/api/chat/message`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      chat_id: chatId,
    },
  });

  return Response.json(res.data);
}
export async function POST(req: Request): Promise<any> {
  const data = await req.json();

  const { chat_id, message, category, token } = data;

  const BACKEND_URL = process.env.BACKEND_URL;
  if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not set');
  }

  const res = await axios.post(
    `${BACKEND_URL}/api/chat/message`,
    { chat_id, message, category },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return Response.json(res.data);
}
