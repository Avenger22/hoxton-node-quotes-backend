import { db } from '../setupDbModel';

// #region 'Sql Queries for endpoints'
export const getAllAuthors = db.prepare(`SELECT * FROM authors;`);
export const getAuthorById = db.prepare(`SELECT * FROM authors WHERE author_id=?;`);
export const updateAuthor = db.prepare(`UPDATE authors SET firstName = ?, lastName = ?, age = ?, avatar = ? WHERE author_id=?;`);
export const deleteAuthor = db.prepare(`DELETE FROM authors WHERE author_id=?;`);
export const getQuotesForAuthor = db.prepare(`
SELECT * FROM quotes
WHERE author_id = ?;
`);
// #endregion