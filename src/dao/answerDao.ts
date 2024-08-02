import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const findAnswersFromQuestion = async (idx: number) => {
    return await prisma.answer.findMany({
        where: { questionIdx: idx },
    })
}
export const deleteAnswersFromQuestion = async (idx: number) => {
    return await prisma.answer.deleteMany({
        where: { questionIdx: idx },
    })
}

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

export const likeAnswerByIdx = async (idx: number) => {
    return await prisma.answer.update({
        where: { idx: idx },
        data: {
            likes: {
                increment: 1,
            },
        },
    })
}
