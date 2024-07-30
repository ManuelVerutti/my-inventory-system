
'use client'

import { useState, useEffect } from 'react'
import SaleForm from '@/app/components/saleForm'

type Sale = {
    id: number
    quantity: number
    seller: { id: number; name: string }
    customer: { id: number; name: string }
    productId: number
    sellerId: number
    customerId: number
}

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

export default function SalesPage() {
    const [sales, setSales] = useState<Sale[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [isAddingSale, setIsAddingSale] = useState(false)
    const [editingSale, setEditingSale] = useState<Sale | null>(null)

    const fetchSales = async () => {
        try {
            const response = await fetch('/api/sales')
            if (!response.ok) {
                throw new Error('Error fetching sales')
            }
            const data = await response.json()
            setSales(data)
        } catch (error) {
            console.error('Error fetching sales:', error)
            // Aquí podrías establecer un estado de error y mostrarlo en la UI
        }
    }

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

        // Agrupar ventas por producto
        const salesByProduct = sales.reduce((acc, sale) => {
            if (!acc[sale.productId]) {
                acc[sale.productId] = [];
            }
            acc[sale.productId].push(sale);
            return acc;
        }, {} as Record<number, Sale[]>);

    useEffect(() => {
        fetchSales()
        fetchProducts()
    }, [])

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta venta?')) {
            try {
                const response = await fetch('/api/sales', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                })

                if (!response.ok) {
                    throw new Error('Error deleting sale')
                }

                // Si la eliminación fue exitosa, actualiza el estado
                setSales(sales.filter(sale => sale.id !== id))
            } catch (error) {
                console.error('Error deleting sale:', error)
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        }
    }

    const handleAddSale = async (saleData: Omit<Sale, 'id'>) => {
        try {
            const response = await fetch('/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(saleData),
            })

            if (!response.ok) {
                throw new Error('Error adding sale')
            }

            fetchSales()
            setIsAddingSale(false)
        } catch (error) {
            console.error('Error adding sale:', error)
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }

    const handleEditSale = async (saleData: Sale) => {
        try {
            const response = await fetch('/api/sales', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(saleData),
            })

            if (!response.ok) {
                throw new Error('Error updating sale')
            }

            fetchSales()
            setEditingSale(null)
        } catch (error) {
            console.error('Error updating sale:', error)
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }

    const getProductTitleById = (id: number): string => {
        const product = products.find(product => product.id === id);
        return product ? product.title : 'Producto desconocido';
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Ventas</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => setIsAddingSale(true)}
            >
                Agregar Venta
            </button>
            {Object.entries(salesByProduct).map(([productId, productSales]) => (
                <div key={productId} className="mb-8">
                    <h3 className="text-xl font-bold mb-2">{getProductTitleById(Number(productId))}</h3>
                    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                        <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-2 bg-gray-50 font-bold">
                            <div>ID</div>
                            <div>Cantidad</div>
                            <div>Vendedor</div>
                            <div>Cliente</div>
                            <div>Acciones</div>
                        </div>
                        {productSales.map((sale) => (
                            <div key={sale.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 py-2 border-b">
                                <div className="font-bold md:hidden m-0">ID:</div>
                                <div>{sale.id}</div>
                                <div className="font-bold md:hidden m-0">Cantidad:</div>
                                <div>{sale.quantity}</div>
                                <div className="font-bold md:hidden m-0">Vendedor:</div>
                                <div>{sale.seller?.name}</div>
                                <div className="font-bold md:hidden m-0">Cliente:</div>
                                <div>{sale.customer?.name}</div>
                                <div className="flex flex-col md:flex-row md:space-x-2 mt-2 md:mt-0">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm mb-2 md:mb-0 max-h-7"
                                        onClick={() => setEditingSale(sale)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm max-h-7"
                                        onClick={() => handleDelete(sale.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {/* Mantener el modal para agregar/editar ventas */}
            {(isAddingSale || editingSale) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">
                            {editingSale ? 'Editar Venta' : 'Agregar Nueva Venta'}
                        </h2>
                        <SaleForm
                            onSubmit={editingSale ? handleEditSale : handleAddSale}
                            onCancel={() => {
                                setIsAddingSale(false);
                                setEditingSale(null);
                            }}
                            initialData={editingSale || undefined}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
