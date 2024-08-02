// src/apis/users/index.ts
import { NextApiRequest, NextApiResponse } from "next"
import { getAllUsers, postUser } from "@/services/userService"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case "GET":
                const users = await getAllUsers()
                return res.status(200).json({ users })
            case "POST":
                // Basic validation before passing to service layer
                const { email, password, name, phone } = req.body
                if (email === null || name === null) {
                    return res
                        .status(400)
                        .json({ status: "이메일과 이름은 필수입니다." })
                }

                const postedUser = await postUser({
                    email,
                    name,
                    password,
                    phone,
                })
                return res.status(201).json({ postedUser })
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
