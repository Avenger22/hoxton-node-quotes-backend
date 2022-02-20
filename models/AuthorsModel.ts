import { db } from '../models/setupDbModel';

// #region 'Sql Queries for endpoints'
export const getAllAuthors = db.prepare(`SELECT * FROM authors;`);
export const getAuthorById = db.prepare(`SELECT * FROM authors WHERE id=?;`);
export const updateAuthor = db.prepare(`UPDATE authors SET firstName = ?, lastName = ?, age = ?, avatar = ? WHERE id=?;`);
export const deleteAuthor = db.prepare(`DELETE FROM authors WHERE id=?;`);

export const createAuthor = (firstName: string, lastName: string, age:string | number, avatar:string) => db.prepare(`
    INSERT INTO authors (firstName, lastName, age, avatar) VALUES (?, ?, ?, ?);
`).run(firstName, lastName, age, avatar)
// #endregion