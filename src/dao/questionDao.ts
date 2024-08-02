import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const findQuestionByIdx = async (idx: number) => {
    return await prisma.question.findUnique({
        where: { idx: idx },
    })
}

export const findAllQuestions = async () => {
    return await prisma.question.findMany()
}

export const createQuestion = async (data: {
    title: string
    content: string
    authorIdx: number
}) => {
    return await prisma.question.create({
        data: {
            ...data,
            likes: 0,
        },
    })
}

export const deleteQuestionByIdx = async (idx: number) => {
    return await prisma.question.delete({
        where: { idx: idx },
    })
}

export const updateQuestionByIdx = async (
    idx: number,
    data: {
        title?: string
        content?: string
    }
) => {
    return await prisma.question.update({
        where: { idx: idx },
        data: {
            ...data,
        },
    })
}

export const likeQuestionByIdx = async (idx: number) => {
    return await prisma.question.update({
        where: { idx: idx },
        data: {
            likes: {
                increment: 1,
            },
        },
    })
}
