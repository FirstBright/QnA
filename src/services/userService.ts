// src/services/userService.ts
import {
    createUser as createUserInDB,
    deleteUserById,
    findAllUsers,
    findUserById,
    updateUserById,
} from "@/dao/userDao"

interface CreateUserInput {
    email: string
    name: string
    password: string
    phone: string
}

interface UpdateUserInput {
    name?: string
    phone?: string
}

export const getAllUsers = async () => {
    return await findAllUsers()
}

export const getUserById = async (idx: number) => {
    return await findUserById(idx)
}

export const createUser = async (data: CreateUserInput) => {
    // Additional business logic validation if needed
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (emailRegex.test(data.email) === false) {
        throw new Error("유효하지 않은 이메일 형식입니다.")
    }

    return await createUserInDB(data)
}

export const deleteUser = async (idx: number) => {
    return await deleteUserById(idx)
}
export const updateUser = async (idx: number, data: UpdateUserInput) => {
    return await updateUserById(idx, data)
}
