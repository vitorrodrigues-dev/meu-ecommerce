"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/dashboard/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || 'Falha na autenticação');
      }

      const data = await res.json();
      localStorage.setItem('admin_token', data.token);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Login Administrativo</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white p-6 rounded shadow">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Senha</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-1 w-full p-2 border rounded" />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Entrar</button>
      </form>
    </main>
  );
}
