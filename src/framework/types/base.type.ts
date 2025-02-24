type Data<T> = {
    data: T | T[]
}

export type Base = {
    status: boolean
    message: string
}

export type Response<T> = Base & Data<T>