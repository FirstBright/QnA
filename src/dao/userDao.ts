// src/dao/userDao.ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const findUserById = async (idx: number) => {
    return await prisma.user.findUnique({
        where: { idx: idx },
    })
}

export const findAllUsers = async () => {
    return await prisma.user.findMany()
}

export const createUser = async (data: {
    email: string
    name: string
    phone: string
    password: string
}) => {
    return await prisma.user.create({
        data,
    })
}

export const deleteUserById = async (idx: number) => {
    return await prisma.user.delete({
        where: { idx: idx },
    })
}

export const updateUserById = async (
    idx: number,
    data: {
        name?: string
        phone?: string
    }
) => {
    return await prisma.user.update({
        where: { idx: idx },
        data: {
            ...data,
        },
    })
}

// Add other data access methods as needed
