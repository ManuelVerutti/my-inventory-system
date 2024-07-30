import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los usuarios (READ)
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return NextResponse.json({ error: "Error obteniendo usuarios" }, { status: 500 });
    }
}

// Crear un nuevo usuario (CREATE)
export async function POST(req: Request) {
    try {
        const { name, email, role } = await req.json();
        const newUser = await prisma.user.create({
            data: { name, email, role },
        });
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creando usuario:", error);
        return NextResponse.json({ error: "Error creando usuario" }, { status: 500 });
    }
}

// Actualizar un usuario (UPDATE)
export async function PUT(req: Request) {
    try {
        const { id, name, email, role } = await req.json();
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, role },
        });
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error actualizando usuario:", error);
        return NextResponse.json({ error: "Error actualizando usuario" }, { status: 500 });
    }
}

// Eliminar un usuario (DELETE)
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        await prisma.user.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error eliminando usuario:", error);
        return NextResponse.json({ error: "Error eliminando usuario" }, { status: 500 });
    }
}