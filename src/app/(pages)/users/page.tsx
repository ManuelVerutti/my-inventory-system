'use client'

import { useState, useEffect } from 'react'
import UserForm from '@/app/components/userForm'

type User = {
    id: number
    name: string
    email: string
    role: 'SELLER' | 'CUSTOMER'
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [isAddingUser, setIsAddingUser] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)


    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users')
            if (!response.ok) {
                throw new Error('Error fetching users')
            }
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.error('Error fetching users:', error)
            // Aquí podrías establecer un estado de error y mostrarlo en la UI
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                const response = await fetch('/api/users', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                })

                if (!response.ok) {
                    throw new Error('Error deleting user')
                }

                // Si la eliminación fue exitosa, actualiza el estado
                setUsers(users.filter(user => user.id !== id))
            } catch (error) {
                console.error('Error deleting user:', error)
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        }
    }

    const handleAddUser = async (userData: Omit<User, 'id'>) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            if (!response.ok) {
                throw new Error('Error adding user')
            }

            const newUser = await response.json()
            setUsers([...users, newUser])
            setIsAddingUser(false)
        } catch (error) {
            console.error('Error adding user:', error)
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }

    const handleEditUser = async (userData: User) => {
        try {
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            if (!response.ok) {
                throw new Error('Error updating user')
            }

            const updatedUser = await response.json()
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user))
            setEditingUser(null)
        } catch (error) {
            console.error('Error updating user:', error)
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    }

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Usuarios</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => setIsAddingUser(true)}
        >
          Agregar Usuario
        </button>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <div className="hidden md:grid grid-cols-5 gap-3 px-4 py-2 bg-gray-50 font-bold">
            <div>ID</div>
            <div>Nombre</div>
            <div>Email</div>
            <div>Rol</div>
            <div>Acciones</div>
          </div>
          {users.map((user) => (
            <div key={user.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 px-4 py-2 border-b ">
              <div className="font-bold md:hidden m-0">ID:</div>
              <div>{user.id}</div>
              <div className="font-bold md:hidden m-0">Nombre:</div>
              <div>{user.name}</div>
              <div className="font-bold md:hidden m-0">Email:</div>
              <div className="text-wrap box-content break-words">{user.email}</div>
              <div className="font-bold md:hidden m-0">Rol:</div>
              <div>{user.role}</div>
              <div className="flex flex-col md:flex-row md:space-x-2 mt-2 md:mt-0">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm mb-2 md:mb-0 max-h-7"
                  onClick={() => setEditingUser(user)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm max-h-7"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        {(isAddingUser || editingUser) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
              </h2>
              <UserForm
                onSubmit={editingUser ? handleEditUser : handleAddUser}
                onCancel={() => {
                  setIsAddingUser(false);
                  setEditingUser(null);
                }}
                initialData={editingUser || undefined}
              />
            </div>
          </div>
        )}
      </div>
    )
}