// app/components/SaleForm.tsx
import React, { useState, useEffect } from 'react'

type Product = {
  id: number
  title: string
}

type User = {
  id: number
  name: string
  role: 'SELLER' | 'CUSTOMER'
}

type Sale = {
  id?: number
  productId: number
  quantity: number
  sellerId: number
  customerId: number
}

type SaleFormProps = {
  onSubmit: (saleData: Sale) => void
  onCancel: () => void
  initialData?: Sale
}

const SaleForm: React.FC<SaleFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [productId, setProductId] = useState(initialData?.productId || 0)
  const [quantity, setQuantity] = useState(initialData?.quantity || 1)
  const [sellerId, setSellerId] = useState(initialData?.sellerId || 0)
  const [customerId, setCustomerId] = useState(initialData?.customerId || 0)

  useEffect(() => {
    // Fetch products and users
    const fetchProductsAndUsers = async () => {
      try {
        const [productsRes, usersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/users')
        ])
        
        if (!productsRes.ok || !usersRes.ok) {
          throw new Error('Error fetching products or users')
        }

        const productsData = await productsRes.json()
        const usersData = await usersRes.json()
        
        setProducts(productsData)
        setUsers(usersData)
      } catch (error) {
        console.error('Error fetching products or users:', error)
        // Aquí podrías establecer un estado de error y mostrarlo en la UI
      }
    }

    fetchProductsAndUsers()
  }, [])

  useEffect(() => {
    if (initialData) {
      setProductId(initialData.productId)
      setQuantity(initialData.quantity)
      setSellerId(initialData.sellerId)
      setCustomerId(initialData.customerId)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ id: initialData?.id, productId, quantity, sellerId, customerId })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="product" className="block text-sm font-medium text-gray-700">
          Producto
        </label>
        <select
          id="product"
          value={productId}
          onChange={(e) => setProductId(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option value="">Seleccione un producto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Cantidad
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="seller" className="block text-sm font-medium text-gray-700">
          Vendedor
        </label>
        <select
          id="seller"
          value={sellerId}
          onChange={(e) => setSellerId(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option value="">Seleccione un vendedor</option>
          {users.filter(user => user.role === 'SELLER').map((seller) => (
            <option key={seller.id} value={seller.id}>{seller.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
          Cliente
        </label>
        <select
          id="customer"
          value={customerId}
          onChange={(e) => setCustomerId(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option value="">Seleccione un cliente</option>
          {users.filter(user => user.role === 'CUSTOMER').map((customer) => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Guardar
        </button>
      </div>
    </form>
  )
}

export default SaleForm
