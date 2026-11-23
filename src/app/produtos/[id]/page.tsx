import { Produto } from "@/interfaces/product.interface";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from '@/components/AddToCartButton';

async function getProduto(id: string): Promise<Produto> {
  const baseUrl = process.env.NEXT_PUBLIC_SELF_URL ?? '';
  const response = await fetch(`${baseUrl}/api/dashboard/produtos/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const produto = await getProduto(id);

  return (
    <main className="container mx-auto p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold text-gray-900">{produto.nome}</h1>

        <p className="text-3xl text-blue-700 my-6 font-semibold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(produto.valor)}
        </p>

        <div className="space-y-3 text-lg text-gray-600">
          <p><span className="font-semibold">Quantidade em estoque:</span> {produto.quantidade}</p>
          <p><span className="font-semibold">Data de fabricação:</span> {new Date(produto.dataFabricacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
        </div>

        <div className="space-y-3 w-full mt-3">
          <AddToCartButton produto={produto} />
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
            &larr; Voltar para a lista de produtos
          </Link>
        </div>
      </div>
    </main>
  );
}
