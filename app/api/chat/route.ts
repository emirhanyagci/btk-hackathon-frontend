import axios from 'axios';

export async function GET(req: Request): Promise<any> {
  const data = await req.json();

  const { token } = data;
  const BACKEND_URL = process.env.BACKEND_URL;
  if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not set');
  }

  const res = await axios.post(
    `${BACKEND_URL}/api/chat/message`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return Response.json(res.data);
}
export async function POST(req: Request): Promise<any> {
  const data = await req.json();

  const { token } = data;
  const BACKEND_URL = process.env.BACKEND_URL;
  if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not set');
  }

  const res = await axios.post(
    `${BACKEND_URL}/api/chat`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return Response.json(res.data);
}
