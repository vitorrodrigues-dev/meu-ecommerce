"use client";

import React, { createContext, useContext, useState } from 'react';
import { Produto } from '@/interfaces/product.interface';

type CartItem = Produto & { quantidadeNoCarrinho: number };

interface CartContextValue {
  itens: CartItem[];
  adicionar: (produto: Produto, quantidade?: number) => void;
  remover: (produtoId: number) => void;
  limpar: () => void;
  totalQuantidade: number;
  totalValor: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('carrinho') : null;
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch (e) {
      console.warn('Falha ao ler carrinho do localStorage', e);
      return [];
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('carrinho', JSON.stringify(itens));
    } catch (e) {
      console.warn('Falha ao salvar carrinho no localStorage', e);
    }
  }, [itens]);

  function adicionar(produto: Produto, quantidade = 1) {
    setItens((prev) => {
      const existing = prev.find((p) => p.id === produto.id);
      if (existing) {
        return prev.map((p) => p.id === produto.id ? { ...p, quantidadeNoCarrinho: p.quantidadeNoCarrinho + quantidade } : p);
      }
      return [...prev, { ...produto, quantidadeNoCarrinho: quantidade }];
    });
    alert(`Adicionado ${produto.nome} ao carrinho.`);
  }

  function remover(produtoId: number) {
    setItens((prev) => prev.filter((p) => p.id !== produtoId));
    alert(`Removido item do carrinho.`);
  }

  function limpar() {
    setItens([]);
    alert('Carrinho esvaziado.');
  }

  const totalQuantidade = itens.reduce((s, i) => s + i.quantidadeNoCarrinho, 0);
  const totalValor = itens.reduce((s, i) => s + i.valor * i.quantidadeNoCarrinho, 0);

  return (
    <CartContext.Provider value={{ itens, adicionar, remover, limpar, totalQuantidade, totalValor }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
