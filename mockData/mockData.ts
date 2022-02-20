import {Quote, Author} from "./types"

export function setQuotes(array:Quote[]):void {
    quotes = array
}

export function setAuthors(array:Author[]):void {
    authors = array
}

export let quotes:Quote[] = [
    {
        id: 1,
        quote: "Life isnt about getting and having, its about giving and being.",
        author_Id: 1
    },
    {
        id: 2,
        quote: "Whatever the mind of man can conceive and believe, it can achieve.",
        author_Id: 1
    },
    {
        id: 3,
        quote: "Strive not to be a success, but rather to be of value.",
        author_Id: 2
    },
    {
        id: 4,
        quote: "Two roads diverged in a wood, and i took the one less traveled by, And that has made all the difference.",
        author_Id: 3
    },
    {
        id: 5,
        quote: "I attribute my success to this: I never gave or took any excuse.",
        author_Id: 3
    },
    {
        id: 6,
        quote: "You miss 100% of the shots you dont take.",
        author_Id: 1
    },
    {
        id: 7,
        quote: "Ive missed more than 9000 shots in my career. Ive lost almost 300 games. 26 times Ive been trusted to take the game winning shot and missed. Ive failed over and over and over again in my life. And that is why I succeed.",
        author_Id: 2
    },
    {
        id: 8,
        quote: "The most difficult thing is the decision to act, the rest is merely tenacity.",
        author_Id: 3
    },
    {
        id: 9,
        quote: "Every strike brings me closer to the next home run.",
        author_Id: 1
    },
    {
        id: 10,
        quote: "Definiteness of purpose is the starting point of all achievement.",
        author_Id: 2
    },
    {
        id: 11,
        quote: "Life is what happens to you while youre busy making other plans.",
        author_Id: 3
    }
]

export let authors:Author[] = [
    {
        id: 1,
        firstName: "Kevin",
        lastName: "Kruse",
        age: 35,
        avatar: "/assets/images/kruse.png"
    },
    {
        id: 2,
        firstName: "Napoleon",
        lastName: "Hill",
        age: 55,
        avatar: "/assets/images/napoleon.jpg"
    },
    {
        id: 3,
        firstName: "W.Clement",
        lastName: "Stone",
        age: 42,
        avatar: "/assets/images/clementstone.jpg"
    }
]