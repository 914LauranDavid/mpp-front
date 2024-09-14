export interface User {
    id: string,
    name: string,
    email: string,
    role: string
}

export interface RawUser {
    name: string,
    email: string,
    user_id: string
}

export interface UserToBeCreated {
    name: string,
    email: string,
    password: string,
    role: string
}
