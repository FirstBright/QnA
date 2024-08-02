import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const findUserByIdx = async (idx: number) => {
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
        data: {
            ...data,
        },
    })
}

export const deleteUserByIdx = async (idx: number) => {
    return await prisma.user.delete({
        where: { idx: idx },
    })
}

export const updateUserByIdx = async (
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
