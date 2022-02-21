import { db } from '../setupDbModel';

// #region 'Sql Queries for endpoints'
export const getAllQuotes = db.prepare(` SELECT * FROM quotes;`);
export const getQuoteById = db.prepare(`SELECT quote_id, quote FROM quotes WHERE quote_id = ?;`);
export const updateQuote = db.prepare(`UPDATE quotes SET quote = ?, author_id = ? WHERE quote_id = ?;`);
export const deleteQuote = db.prepare(`DELETE FROM quotes WHERE quote_id = ?;`);
export const deleteAuthorsQuotes = db.prepare(`
DELETE FROM quotes WHERE author_id = ?;
`)
// #endregion