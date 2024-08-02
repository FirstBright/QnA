import {
    createAnswer,
    deleteAnswerByIdx,
    likeAnswerByIdx,
    updateAnswerByIdx,
} from "@/dao/answerDao"
import { getQuestionByIdx } from "./questionService"

interface ICreateAnswer {
    questionIdx: number
    authorIdx: number
    content: string
}

export const deleteAnswer = async (idx: number) => {
    return await deleteAnswerByIdx(idx)
}
export const updateAnswer = async (idx: number, content: string) => {
    return await updateAnswerByIdx(idx, content)
}

export const postAnswer = async (data: ICreateAnswer) => {
    const question = await getQuestionByIdx(data.questionIdx)
    if (question?.authorIdx == data.authorIdx) {
        throw new Error("본인의 질문에는 대답할 수 없습니다.")
    }
    return await createAnswer(data)
}

export const likeAnswer = async (idx: number) => {
    return await likeAnswerByIdx(idx)
}
