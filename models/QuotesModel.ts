import { db } from '../setupDbModel';

// #region 'Sql Queries for endpoints'
export const getAllQuotes = db.prepare(` SELECT * FROM quotes;`);
export const getQuoteById = db.prepare(`SELECT * FROM quotes WHERE id = ?;`);
export const updateQuote = db.prepare(`UPDATE quotes SET quote = ?, author_id = ? WHERE id = ?;`);
export const deleteQuote = db.prepare(`DELETE FROM quotes WHERE id = ?;`);
// #endregion