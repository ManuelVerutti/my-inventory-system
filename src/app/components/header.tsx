"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md fixed w-full top-0 left-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Prueba Técnica Manuel Verutti</h1>
        <button
          className="block lg:hidden px-3 py-2 rounded-md text-gray-200 hover:bg-gray-700"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <nav
          className={`lg:flex flex-col lg:flex-row space-x-4 lg:space-x-6 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}
        >
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
            <li>
              <Link
                className="hover:bg-gray-700 px-3 py-2 rounded"
                href="/sales"
              >
                Ventas
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-gray-700 px-3 py-2 rounded"
                href="/products"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-gray-700 px-3 py-2 rounded"
                href="/users"
              >
                Usuarios
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

