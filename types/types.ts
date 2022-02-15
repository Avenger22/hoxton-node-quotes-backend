export type Quote = {
    id: number,
    quote: string,
    authorId: number
}

export type Author = {
    id: number
    firstName: string
    lastName: string
    age: number | string
    avatar: string
}