export type Quote = {
    id: number,
    quote: string,
    authorId: number
    author?: Author[] | undefined
}

export type Author = {
    id: number
    firstName: string
    lastName: string
    age: number | string
    avatar: string
    quotes?: Quote[] | undefined
}