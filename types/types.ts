export type Quote = {
    id: number
    quote: string,
    author_Id: number
    // author?: Author[] 
}

export type Author = {
    id: number
    firstName: string
    lastName: string
    age: number | string
    avatar: string
    // quotes?: Quote[]
}