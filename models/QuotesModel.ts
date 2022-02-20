import { db } from '../models/setupDbModel';

// #region 'Sql Queries for endpoints'
export const getAllQuotes = db.prepare(` SELECT * FROM quotes;`);
export const getQuoteById = db.prepare(`SELECT * FROM quotes WHERE id=?;`);
export const updateQuote = db.prepare(`UPDATE quotes SET quote = ? author_id = ? WHERE id=?;`);
export const deleteQuote = db.prepare(`DELETE FROM quotes WHERE id = ?;`);

export const createQuote = (quote: string, author_id: number) => db.prepare(`
    INSERT INTO quotes (quote, author_id) VALUES (?, ?);
 `).run(quote, author_id)
// #endregion