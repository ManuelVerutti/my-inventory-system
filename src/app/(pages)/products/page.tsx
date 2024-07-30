'use client'

import { useState, useEffect } from 'react'

type Product = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products')
            if (!response.ok) {
                throw new Error('Error fetching products')
            }
            const data = await response.json()
            setProducts(data)
        } catch (error) {
            console.error('Error fetching products:', error)
            // Aquí podrías establecer un estado de error y mostrarlo en la UI
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white shadow-md rounded-2xl overflow-y-auto max-h-full">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-bold">{product.title}</h2>
                            <p className="text-gray-600">${product.price}</p>
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <div className="mt-2 flex items-center">
                                <div className="text-yellow-500">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <svg
                                            key={index}
                                            className={`w-4 h-4 inline ${index < Math.floor(product.rating.rate) ? 'fill-current' : 'stroke-current'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.2 6.72a1 1 0 00.95.69h7.08c.97 0 1.371 1.24.588 1.81l-5.74 4.17a1 1 0 00-.364 1.118l2.2 6.72c.3.92-.755 1.68-1.539 1.118l-5.74-4.17a1 1 0 00-1.176 0l-5.74 4.17c-.784.562-1.838-.198-1.538-1.118l2.2-6.72a1 1 0 00-.364-1.118L2.832 12.347c-.783-.57-.382-1.81.588-1.81h7.08a1 1 0 00.95-.69l2.2-6.72z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="ml-2 text-gray-600">({product.rating.count})</span>
                            </div>
                            <p className="text-gray-700 mt-2 max-h-44">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
