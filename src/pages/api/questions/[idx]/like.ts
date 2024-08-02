import { likeQuestion } from "@/services/questionService"
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
        if (req.method == "POST") {
            const like = await likeQuestion(numIdx)
            return res.status(200).json({ status: "like!" })
        } else {
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
