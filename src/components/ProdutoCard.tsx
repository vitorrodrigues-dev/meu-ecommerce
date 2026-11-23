import { Produto } from '@/interfaces/product.interface';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

interface ProdutoCardProps {
  produto: Produto;
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {
  return (
    <Link href={`/produtos/${produto.id}`} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-900 truncate">{produto.nome}</h2>
      <p className="text-xl text-blue-600 font-medium mt-2">
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(produto.valor)}
      </p>
      <div className="mt-4">
        <AddToCartButton produto={produto} />
      </div>
    </Link>
  );
}
