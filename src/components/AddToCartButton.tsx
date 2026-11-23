"use client";

import React from 'react';
import { Produto } from '@/interfaces/product.interface';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ produto }: { produto: Produto }) {
  const { adicionar } = useCart();

  return (
    <button
      onClick={() => adicionar(produto, 1)}
      className="bg-blue-600 text-white px-3 py-2 rounded"
    >
      Adicionar ao carrinho
    </button>
  );
}
