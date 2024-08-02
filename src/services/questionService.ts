import {
    deleteQuestionByIdx,
    findAllQuestions,
    findQuestionByIdx,
    likeQuestionByIdx,
    updateQuestionByIdx,
} from "@/dao/questionDao"
import { createQuestion } from "./../dao/questionDao"
import {
    deleteAnswersFromQuestion,
    findAnswersFromQuestion,
} from "@/dao/answerDao"

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
    if (data.title.length < 2 || data.content.length < 3) {
        throw new Error("제목은 2자이상 내용은 3자이상으로 작성해주세요.")
    }
    return await createQuestion(data)
}

export const deleteQuestion = async (idx: number) => {
    const haveAnswer = await findAnswersFromQuestion(idx)
    if (haveAnswer.length !== 0) {
        await deleteAnswersFromQuestion(idx)
    }
    return await deleteQuestionByIdx(idx)
}

export const updateQuestion = async (idx: number, data: IUpdateQuestion) => {
    const haveAnswer = await findAnswersFromQuestion(idx)
    if (haveAnswer.length !== 0) {
        throw new Error("답변이 있어, 수정할 수 없습니다.")
    }
    return await updateQuestionByIdx(idx, data)
}

export const likeQuestion = async (idx: number) => {
    return await likeQuestionByIdx(idx)
}
