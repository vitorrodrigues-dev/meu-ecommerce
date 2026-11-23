import { Produto } from '@/interfaces/product.interface';
import ProdutoCard from '@/components/ProdutoCard';

async function getProdutos(): Promise<Produto[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SELF_URL ?? '';
    const response = await fetch(`${baseUrl}/api/dashboard/produtos`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar dados dos produtos da API.');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function HomePage() {
  const produtos = await getProdutos();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Nossos Produtos</h1>

      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </main>
  );
}
