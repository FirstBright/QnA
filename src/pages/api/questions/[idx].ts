// src/apis/users/[id].ts
import { deleteQuestion, getQuestionByIdx, updateQuestion } from "@/services/questionService"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { idx } = req.query
    const idxStr = Array.isArray(idx) ? idx[0] : idx

    if (
        !idxStr ||
        isNaN(parseInt(idxStr, 10)) ||
        parseInt(idxStr, 10).toString() !== idxStr
    ) {
        return res.status(400).json({ status: "Invalid idx" })
    }

    const numIdx = parseInt(idxStr, 10)

    try {
        switch (req.method) {
            case "GET":
                const question = await getQuestionByIdx(numIdx)
                return res.status(200).json({ question })
            case "DELETE":
                const deletedQuestion = await deleteQuestion(numIdx)
                return res.status(200).json({ deletedQuestion })
            case "PUT":
                const { title, content } = req.body
                if (title === null && content === null) {
                    return res
                        .status(404)
                        .json({ status: "업데이트 정보가 없습니다." })
                }
                const updatedQuestion = await updateQuestion(numIdx, {
                    title: title,
                    content: content,
                })
                return res.status(200).json({ updatedQuestion })
            default:
                res.setHeader("Allow", ["GET", "DELETE", "PUT"])
                return res
                    .status(405)
                    .end(`${req.method} 지원하지 않는 매서드 입니다.`)
        }
    } catch (e) {
        return res.status(400).json({ status: "서비스 문제 입니다." })
    }
}

export default handler
