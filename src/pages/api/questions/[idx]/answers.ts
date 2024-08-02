import { findAnswersFromQuestion } from "@/dao/answerDao"
import { postAnswer } from "@/services/answerService"
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
                const question = await findAnswersFromQuestion(numIdx)
                return res.status(200).json({ question })
            case "POST":
                const { content, authorIdx } = req.body
                if (content === undefined || authorIdx === undefined) {
                    return res
                        .status(404)
                        .json({ status: "업데이트 정보가 없습니다." })
                }
                const answer = await postAnswer({
                    authorIdx: authorIdx,
                    content: content,
                    questionIdx: numIdx,
                })
                return res.status(200).json({ answer })
            default:
                res.setHeader("Allow", ["GET", "POST"])
                return res
                    .status(405)
                    .end(`${req.method} 지원하지 않는 매서드 입니다.`)
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({ status: error.message })
        }
        return res.status(400).json({ status: "Unknown error occurred." })
    }
}

export default handler
