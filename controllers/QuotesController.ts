import {
    getAllQuotes, getQuoteById, deleteQuote, updateQuote
} from "../models/QuotesModel"

import {
    getAuthorById
} from "../models/AuthorsModel"

import { createQuote } from "../setupDbModel"

// #region 'Creating controllers logic for routers to use'
export const quotesController = {

    allQuotesGet: (req: any, res: any) => {
    
        const quotes: any = getAllQuotes.all();

        for (const quote of quotes) {
            const author = getAuthorById.get(quote.author_id);
            quote.author = author;
        }

        res.send(quotes)

    },

    individualQuoteGet: (req: any, res: any) => {

        const id = String(req.params.id)
        const quote = getQuoteById.get(id);

        const author = getAuthorById.get(quote.author_id);
        quote.author = author;
      
        if (quote) {
          res.send(quote);
        } 
        
        else {
          res.status(404).send({ error: 'quote not found.' });
        }

    },

    individualQuoteDelete: (req: any, res: any) => {

        // get id
        const id = Number(req.params.id);
        const result = deleteQuote.run(id);

        console.log('result:', result);

        if (result.changes !== 0) {
            res.send({ message: 'quote deleted successfully.' });
        } 
        
        else {
            res.status(404).send({ error: 'quote does not exist.' });
        }
        
    },

    quotePost: (req: any, res: any) => {

        const quoteParam = req.body.quote
        const authorId = req.body.author_id
        const errors = [];

        if (typeof quoteParam !== 'string') {
            errors.push(`quote missing or not a string.`);
        }

        if (typeof authorId !== 'string') {
            errors.push(`Author Id missing or not a string.`);
        }

        if (errors.length === 0) {

            // create the user on the DB

            // @ts-ignore
            const result = createQuote.run(quoteParam, authorId);

            // get the user we just created on the DB
            const quote = getQuoteById.get(result.lastInsertRowid);
            res.send(quote);

        } 
        
        else {
            res.status(400).send({ errors: errors });
        }

    },

    quotePatch: (req: any, res: any) => {

        const id = Number(req.params.id);
        const quote = req.body.quote
        const author_id = req.body.author_id

        // check if the id given actually exists
        const result = getQuoteById.get(id);

        // if it does exist:
        if (result) {

            // change the user in the DB
            updateQuote.run(quote, author_id, id);

            // get the updated user from the DB
            const updatedQuote = getQuoteById.get(id);

            // send the updated user back
            res.send(updatedQuote);

        }

        // if it doesn't exist:
        else {
            res.status(404).send({ error: 'Quote does not exist.' });
        }

    },

    quotePut: (req: any, res: any) => {

        const quoteParam = req.body.quote
        const authorId = req.body.author_id
        const errors = [];

        if (typeof quoteParam !== 'string') {
            errors.push(`quote missing or not a string.`);
        }

        if (typeof authorId !== 'string') {
            errors.push(`Author Id missing or not a string.`);
        }

        if (errors.length === 0) {

            // create the user on the DB

            // @ts-ignore
            const result = createQuote.run(quoteParam, authorId);

            // get the user we just created on the DB
            const quote: any = getQuoteById.get(result.lastInsertRowid);
            res.send(quote);

        } 
        
        else {
            res.status(400).send({ errors: errors });
        }

    }

}
// #endregion