import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (email === 'admin@exemplo.com' && password === 'admin123') {
    return NextResponse.json({ token: 'fake-admin-token' });
  }

  return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
}
