// src/apis/users/[id].ts
import { NextApiRequest, NextApiResponse } from "next"
import { getUserById } from "@/services/userService"
import { deleteUser } from "@/services/userService"
import { updateUser } from "@/services/userService"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { idx } = req.query
    const idxStr = Array.isArray(idx) ? idx[0] : idx

    if (
        !idxStr ||
        isNaN(parseInt(idxStr, 10)) ||
        parseInt(idxStr, 10).toString() !== idxStr
    ) {
        return res.status(400).json({ status: "Invalid id" })
    }

    const numIdx = parseInt(idxStr, 10)

    try {
        switch (req.method) {
            case "GET":
                const user = await getUserById(numIdx)
                return res.status(200).json({ user })
            case "DELETE":
                const deletedUser = await deleteUser(numIdx)
                return res.status(200).json({ deletedUser })
            case "PUT":
                const { name, phone } = req.body
                if (name === null && phone === null) {
                    return res
                        .status(404)
                        .json({ status: "업데이트 정보가 없습니다." })
                }
                const updatedUser = await updateUser(numIdx, {
                    name,
                    phone,
                })
                return res.status(200).json({ updatedUser })
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
