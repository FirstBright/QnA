// src/services/userService.ts
import {
    createUser,
    deleteUserByIdx,
    findAllUsers,
    findUserByIdx,
    updateUserByIdx,
} from "@/dao/userDao"

interface ICreateUser {
    email: string
    name: string
    password: string
    phone: string
}

interface IUpdateUser {
    name?: string
    phone?: string
}

export const getAllUsers = async () => {
    return await findAllUsers()
}

export const getUserByIdx = async (idx: number) => {
    return await findUserByIdx(idx)
}

export const postUser = async (data: ICreateUser) => {
    // Additional business logic validation if needed
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (emailRegex.test(data.email) === false) {
        throw new Error("유효하지 않은 이메일 형식입니다.")
    }

    return await createUser(data)
}

export const deleteUser = async (idx: number) => {
    return await deleteUserByIdx(idx)
}
export const updateUser = async (idx: number, data: IUpdateUser) => {
    return await updateUserByIdx(idx, data)
}
