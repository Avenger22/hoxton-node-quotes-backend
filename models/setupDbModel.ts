// #region 'Importing stuff and db configuration'
import Database from 'better-sqlite3';

import { authors, quotes } from '../mockData/mockData';
import {createAuthor} from "../models/AuthorsModel"
import {createQuote} from "../models/QuotesModel"

export const db = new Database('../database/data.db', {
    verbose: console.log,
});

const createAuthors = db.prepare(`
    CREATE TABLE IF NOT EXISTS authors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        age INTEGER NOT NULL,
        avatar STRING NOT NULL
    );
`);

const createQuotes = db.prepare(`
    CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quote TEXT NOT NULL,
        author_id INTEGER NOT NULL,
        FOREIGN KEY (author_id) REFERENCES authors(id)
    );
 `);

createAuthors.run();
createQuotes.run();
// #endregion

export const joinQuerySql = db.prepare(`SELECT DISTINCT a.id, a.quote, a.author_id, b.firstName, b.lastName, b.age, b.avatar FROM quotes a, authors b WHERE author_id IN (SELECT b.id FROM authors);`);
const deleteQuote: any = db.prepare(`DELETE FROM authors;`)
const deleteAuthor:any = db.prepare(`DELETE FROM quotes;`)

// #region 'Looping from mockData to insert them into DB'
const doStuff = () => {

    // deleteAuthor.run()

    for (const author of authors) {
        createAuthor(author.firstName, author.lastName, author.age, author.avatar);
    }

    // deleteQuote.run()

    for (const quote of quotes) {
        createQuote(quote.quote, quote.author_Id)
    }

}
// #endregion

doStuff()