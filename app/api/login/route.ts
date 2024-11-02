import axios from 'axios';

export async function POST(req: Request): Promise<any> {
  const data = await req.json();

  const BACKEND_URL = process.env.BACKEND_URL;
  if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is not set');
  }

  const res = await axios.post(`${BACKEND_URL}/user/login`, data);

  return Response.json(res.data);
}
