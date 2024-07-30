import { NextResponse } from "next/server";

// Obtener todos los productos (READ)
export async function GET() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return NextResponse.json({ error: "Error obteniendo productos" }, { status: 500 });
    }
}