import Link from 'next/link';


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Bienvenido</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Esta es la prueba técnica de Manuel Verutti para Intercall
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link href="/products" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Productos
          </Link>
          <Link href="/sales" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Ventas
          </Link>
          <Link href="/users" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Usuarios
          </Link>
        </div>
      </div>
    </main>
  );
}
