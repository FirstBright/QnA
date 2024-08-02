import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// export const findAnswerByIdx = async (idx: number) => {
//     return await prisma.answer.findUnique({
//         where: { idx: idx },
//     })
// }

export const createAnswer = async (data: {
    questionIdx: number
    authorIdx: number
    content: string
}) => {
    return await prisma.answer.create({
        data: {
            ...data,
            likes: 0,
        },
    })
}

export const deleteAnswerByIdx = async (idx: number) => {
    return await prisma.answer.delete({
        where: { idx: idx },
    })
}

export const updateAnswerByIdx = async (idx: number, content: string) => {
    return await prisma.answer.update({
        where: { idx: idx },
        data: {
            content: content,
        },
    })
}
