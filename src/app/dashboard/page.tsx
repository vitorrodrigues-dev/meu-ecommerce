"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Produto } from '@/interfaces/product.interface';

export default function DashboardPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/dashboard/login');
      return;
    }

    async function fetchProdutos() {
      try {
        const res = await fetch('/api/dashboard/produtos');
        let data = []
        if (res.ok) {
          data = await res.json();
        }
        setProdutos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, [router]);

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir este produto?')) return;

    const res = await fetch(`/api/dashboard/produtos/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('Falha ao excluir o produto');
    }
  };

  return (
    <main className="container mx-auto p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <Link href="/dashboard/novo" className="bg-green-600 text-white px-4 py-2 rounded">Novo Produto</Link>
      </div>

      {loading ? (
        <p className="mt-6">Carregando...</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b">ID</th>
                <th className="px-6 py-3 border-b">Nome</th>
                <th className="px-6 py-3 border-b">Valor</th>
                <th className="px-6 py-3 border-b">Quantidade</th>
                <th className="px-6 py-3 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                produtos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4">Nenhum produto cadastrado.</td>
                  </tr>
                )
              }
              {produtos.map((p) => (
                <tr key={p.id} className="text-sm">
                  <td className="px-6 py-4 border-b">{p.id}</td>
                  <td className="px-6 py-4 border-b">{p.nome}</td>
                  <td className="px-6 py-4 border-b">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.valor)}</td>
                  <td className="px-6 py-4 border-b">{p.quantidade}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link href={`/dashboard/produto/${p.id}/editar`} className="px-3 py-1 bg-yellow-500 text-white rounded flex">Editar</Link>
                    <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded flex">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
