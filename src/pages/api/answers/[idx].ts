import { deleteAnswer, updateAnswer } from "@/services/answerService"
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
            case "DELETE":
                const deletedUser = await deleteAnswer(numIdx)
                return res.status(200).json({ deletedUser })
            case "PUT":
                const { content } = req.body
                if (content === undefined) {
                    return res
                        .status(404)
                        .json({ status: "업데이트 정보가 없습니다." })
                }
                const updatedUser = await updateAnswer(numIdx, content)
                return res.status(200).json({ updatedUser })
            default:
                res.setHeader("Allow", ["DELETE", "PUT"])
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
