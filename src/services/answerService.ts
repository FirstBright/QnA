import { deleteAnswerByIdx, updateAnswerByIdx } from "@/dao/answerDao"

export const deleteAnswer = async (idx: number) => {
    return await deleteAnswerByIdx(idx)
}
export const updateAnswer = async (idx: number, content: string) => {
    return await updateAnswerByIdx(idx, content)
}
