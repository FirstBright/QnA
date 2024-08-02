import {
    deleteQuestionByIdx,
    findAllQuestions,
    findQuestionByIdx,
    updateQuestionByIdx,
} from "@/dao/questionDao"
import { createQuestion } from "./../dao/questionDao"

interface ICreateQuestion {
    title: string
    content: string
    authorIdx: number
}
interface IUpdateQuestion {
    title?: string
    content?: string
}
export const getAllQuestions = async () => {
    return await findAllQuestions()
}
export const getQuestionByIdx = async (idx: number) => {
    return await findQuestionByIdx(idx)
}

export const postQuestion = async (data: ICreateQuestion) => {
    return await createQuestion(data)
}

export const deleteQuestion = async (idx: number) => {
    return await deleteQuestionByIdx(idx)
}

export const updateQuestion = async (idx: number, data: IUpdateQuestion) => {
    return await updateQuestionByIdx(idx, data)
}
