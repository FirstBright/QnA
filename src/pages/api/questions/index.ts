import { getAllQuestions, postQuestion } from "@/services/questionService"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case "GET":
                const questions = await getAllQuestions()
                return res.status(200).json({ questions })
            case "POST":
                // Basic validation before passing to service layer
                const { title, authorIdx, content } = req.body
                if (title === undefined && content === undefined) {
                    return res
                        .status(400)
                        .json({ status: "제목과 글은 필수입니다." })
                }

                const postedQuestion = await postQuestion({
                    title: title,
                    content: content,
                    authorIdx: authorIdx,
                })
                return res.status(201).json({ postedQuestion })
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
