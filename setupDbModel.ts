// #region 'Importing stuff and db configuration'
import Database from 'better-sqlite3';
import { authors, quotes } from './mockData/mockData';

export const db = new Database('./data.db', {
    verbose: console.log,
});

const dropAuthors = db.prepare(`DROP TABLE IF EXISTS authors;`)
const dropQuotes = db.prepare(`DROP TABLE IF EXISTS quotes;`)

dropAuthors.run()
dropQuotes.run()
const createAuthors = db.prepare(`
    CREATE TABLE IF NOT EXISTS authors (
        author_id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        age INTEGER NOT NULL,
        avatar STRING NOT NULL
    );
`);

const createQuotes = db.prepare(`
    CREATE TABLE IF NOT EXISTS quotes (
        quote_id INTEGER PRIMARY KEY AUTOINCREMENT,
        quote TEXT NOT NULL,
        author_id INTEGER NOT NULL,
        FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE ON UPDATE CASCADE
    );
 `);

createAuthors.run();
createQuotes.run();
// #endregion

// #region 'SQL Queries'
export const joinQuerySql = db.prepare(`SELECT DISTINCT a.quote_id, a.quote, a.author_id, b.firstName, b.lastName, b.age, b.avatar FROM quotes a, authors b WHERE a.author_id IN (SELECT b.author_id FROM authors);`);

const deleteQuote:any = db.prepare(`DELETE FROM authors;`)
const deleteAuthor:any = db.prepare(`DELETE FROM quotes;`)

export const createAuthor = (firstName: string, lastName: string, age:string | number, avatar:string) => db.prepare(`
    INSERT INTO authors (firstName, lastName, age, avatar) VALUES (?, ?, ?, ?);
`).run(firstName, lastName, age, avatar)

export const createQuote = (quote: string, author_id: number) => db.prepare(`
    INSERT INTO quotes (quote, author_id) VALUES (?, ?);
 `).run(quote, author_id)
// #endregion

// #region 'Looping from mockData to insert them into DB'
const doStuff = () => {

    deleteAuthor.run()

    for (const author of authors) {
        createAuthor(author.firstName, author.lastName, author.age, author.avatar);
    }

    //  deleteQuote.run() 
    // THIS CAUSED THE CONSTRAINT ERROR BECASE NO REF CAN BE FOUND THERE ETC

    for (const quote of quotes) {
        createQuote(quote.quote, quote.author_Id)
    }

}
// #endregion

doStuff()