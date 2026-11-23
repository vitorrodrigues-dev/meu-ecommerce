import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">Meu E-commerce</Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href='/carrinho' className="text-gray-600 hover:text-gray-900">Carrinho</Link>
          <Link href="/dashboard/login" className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login Administrativo</Link>
        </nav>
      </div>
    </header>
  );
}
