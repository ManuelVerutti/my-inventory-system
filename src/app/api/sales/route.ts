import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las ventas (READ)
export async function GET() {
    try {
        const sales = await prisma.sale.findMany({
            include: {
                seller: true,
                customer: true,
            },
        });
        return NextResponse.json(sales);
    } catch (error) {
        console.error("Error obteniendo ventas:", error);
        return NextResponse.json({ error: "Error obteniendo ventas" }, { status: 500 });
    }
}

// Crear una nueva venta (CREATE)
export async function POST(req: Request) {
    try {
        const { productId, quantity, sellerId, customerId } = await req.json();
        const newSale = await prisma.sale.create({
            data: {
                productId: Number(productId),
                quantity: Number(quantity),
                sellerId: Number(sellerId),
                customerId: Number(customerId),
            },
        });
        return NextResponse.json(newSale, { status: 201 });
    } catch (error) {
        console.error("Error creando venta:", error);
        return NextResponse.json({ error: "Error creando venta" }, { status: 500 });
    }
}

// Actualizar una venta (UPDATE)
export async function PUT(req: Request) {
    try {
        const { id, productId, quantity, sellerId, customerId } = await req.json();
        const updatedSale = await prisma.sale.update({
            where: { id: Number(id) },
            data: {
                productId: Number(productId),
                quantity: Number(quantity),
                sellerId: Number(sellerId),
                customerId: Number(customerId),
            },
        });
        return NextResponse.json(updatedSale);
    } catch (error) {
        console.error("Error actualizando venta:", error);
        return NextResponse.json({ error: "Error actualizando venta" }, { status: 500 });
    }
}

// Eliminar una venta (DELETE)
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        await prisma.sale.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: "Venta eliminada exitosamente" });
    } catch (error) {
        console.error("Error eliminando venta:", error);
        return NextResponse.json({ error: "Error eliminando venta" }, { status: 500 });
    }
}