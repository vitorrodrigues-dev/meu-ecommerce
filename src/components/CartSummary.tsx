"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function CartSummary() {
  const { itens, totalQuantidade, totalValor, remover, limpar } = useCart();

  return (
    <aside className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h3 className="font-bold text-xl mb-4 text-gray-800">Resumo do Carrinho</h3>
      <table className="min-w-full border rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left">Produto</th>
            <th className="px-4 py-2 border-b text-center">Qtd</th>
            <th className="px-4 py-2 border-b text-center">Valor Unit.</th>
            <th className="px-4 py-2 border-b text-center">Subtotal</th>
            <th className="px-4 py-2 border-b text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">Carrinho vazio.</td>
            </tr>
          ) : (
            itens.map((i) => (
              <tr key={i.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">{i.nome}</td>
                <td className="px-4 py-2 text-center">{i.quantidadeNoCarrinho}</td>
                <td className="px-4 py-2 text-center">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(i.valor)}</td>
                <td className="px-4 py-2 text-center">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(i.valor * i.quantidadeNoCarrinho)}</td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => remover(i.id)} className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition">Remover</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="font-semibold">Total de itens:</span> {totalQuantidade}
        </div>
        <div>
          <span className="font-semibold">Valor total:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValor)}
        </div>
        <button onClick={limpar} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition font-semibold">Esvaziar Carrinho</button>
      </div>
    </aside>
  );
}
