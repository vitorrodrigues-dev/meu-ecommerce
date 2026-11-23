"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NovoProdutoPage() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/dashboard/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          valor: parseFloat(valor),
          quantidade: parseInt(quantidade, 10),
          dataFabricacao,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || 'Falha ao criar produto');
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Novo Produto</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white p-6 rounded shadow">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" required className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Valor</label>
          <input value={valor} onChange={(e) => setValor(e.target.value)} type="number" step="0.01" required className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Quantidade</label>
          <input value={quantidade} onChange={(e) => setQuantidade(e.target.value)} type="number" required className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Data de Fabricação</label>
          <input value={dataFabricacao} onChange={(e) => setDataFabricacao(e.target.value)} type="date" required className="mt-1 w-full p-2 border rounded" />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Salvar Produto</button>
      </form>
    </main>
  );
}
