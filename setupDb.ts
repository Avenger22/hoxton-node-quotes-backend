import Database from 'better-sqlite3';
import { authors, quotes } from './mockData/mockData';

const db = new Database('./data.db', {
  verbose: console.log,
});

// #region 'Sql queries for Creating the tables'
const dropQuotesTable = db.prepare('DROP TABLE quotes;');
dropQuotesTable.run();

const dropAuthorsTable = db.prepare('DROP TABLE authors;');
dropAuthorsTable.run();

const createQuotes = db.prepare(`
    CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER,
        quote TEXT NOT NULL,
        author_id INTEGER,
        PRIMARY KEY (id),
        FOREIGN KEY author_id REFERENCES authors(id)
    );
`);

createQuotes.run();

const createAuthors = db.prepare(`
    CREATE TABLE IF NOT EXISTS authors (
        id INTEGER,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        age INTEGER NOT NULL,
        avatar STRING NOT NULL,
        PRIMARY KEY (id)
    );
`);

createAuthors.run();
// #endregion

// #region 'SQL Queries for populating the tables with mockData'
const createQuote = db.prepare(`
    INSERT INTO quotes (quote, author_id) VALUES (?, ?);
`);

const deleteAllQuotes = db.prepare(`
    DELETE FROM quotes;
`);

const deleteQuote = db.prepare(`
    DELETE FROM quotes WHERE id=?;
`);

const updateQuote = db.prepare(`
    UPDATE quotes SET quote=? WHERE id=?;
`);

const createAuthor = db.prepare(`
    INSERT INTO authors (firstName, lastName, age, avatar) VALUES (?, ?, ?, ?);
`);

const deleteAllAuthors = db.prepare(`
    DELETE FROM authors;
`);

deleteAllQuotes.run();
deleteAllAuthors.run();

for (const quote of quotes) {
  createQuote.run(quote.quote, quote.authorId);
}

for (const author of authors) {
  createAuthor.run(author.firstName, author.lastName, author.age, author.avatar);
}
// #endregion