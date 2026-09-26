import { AppError } from "../errors/AppError";
import { findUserByEmail,createUser, findUserByEmailWithPassword } from "../repositories/user.repository";
import { signAccessToken } from "../lib/jwt";
import bcrypt from 'bcrypt';



export async function registerUser(
    email: string,
    password: string
): Promise<void>{
    if(!email || !password){
        throw new AppError(400,"Email and Password are required")

    }

    if(password.length < 6){
        throw new AppError(400,"password must be at least 6 character long ")
    }

    const normalizeEmail = email.toLocaleLowerCase().trim()

    //find the usr if its already present i db or not
    // if yes then we wil not allow to register with same email


    const existingUser = await findUserByEmail(normalizeEmail)
    if(existingUser){
        throw new AppError(409, "email already present!");
    }

    const passwordHash = await bcrypt.hash(password,10);
    await createUser(normalizeEmail,passwordHash);
}


export async function loginUser(
    email: string,
    password: string
):Promise<{accessToken: string}>{
    if(!email || !password){
        throw new AppError(400,"Email and Password are required")

    }
    const normalizeEmail = email.toLocaleLowerCase().trim()
    const user = await findUserByEmailWithPassword(normalizeEmail)


    if(!user?.password_hash){
        throw new AppError(401, "Invalid email or password")
    }

    const isPasswordValid = await bcrypt.compare(password,user.password_hash)

    if(!isPasswordValid){
        throw new AppError(401, "Invalid email or password")
    }

    const accessToken =signAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role
    })

    return {accessToken}

}