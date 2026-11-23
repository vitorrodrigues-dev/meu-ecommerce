import CartSummary from '@/components/CartSummary';
export default function CarrinhoPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Seu Carrinho</h1>
      <CartSummary />
    </main>
  );
}
