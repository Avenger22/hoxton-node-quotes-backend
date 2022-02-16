import { Router } from 'express';
import {quotes, setQuotes, authors, setAuthors} from '../db/db';
import {Quote, Author} from '../types/types'

const router = Router()

// #region 'end points for quotes'
router.get('/:id', (req, res) => {

    const id: string = String(req.params.id)
    const match: Quote = quotes.find((quote) => quote.id === Number(id))
    
    const author: Author = authors.find((author) => author.id === match.authorId);
    // @ts-ignore
    match.author = author;

    if (match) {
      res.send(match)
    } 
    
    else {
      res.status(404).send({ error: 'Quote not found.' })
    }
  
})

router.get('/', (req, res) => {

  if (req.query.search) {

    let quotesToSend = quotes
    let search = req.query.search as string

    if (typeof search === 'string') {

      console.log('Filtering dogs with search:', search);
      quotesToSend = quotesToSend.filter((quote) =>
        quote.quote.toUpperCase().includes(search.toUpperCase())
      );

    }
    
    res.send(quotesToSend)

  }

  else {

    let quotesCopy = JSON.parse(JSON.stringify(quotes));

    for (const quote of quotesCopy) {

      const author = authors.find((author) => author.id === quote.authorId);
      quote.author = author;
      
    }

    res.send(quotesCopy);

  }

})

router.post('/', (req, res) => {

  const quote = req.body.quote
  const errors = [];

  const lastQuoteId = Math.max(...quotes.map((quote) => quote.id));
  const newId = lastQuoteId + 1;

  if (typeof quote !== 'string') {
    errors.push(`Quote missing or not a string.`);
  }

  if (errors.length === 0) {

    const newQuote: Quote = {
      id: Number(newId),
      quote: quote,
      authorId: 2
    };

    // add Quote to our quotes array
    // (like a memory db, this is forgotten when node restarts)
    
    quotes.push(newQuote);

    // @ts-ignore
    // quotes = [...quotes, newQuote]

    res.status(201).send(newQuote);

  } 
  
  else {
    res.status(400).send({ errors: errors });
  }

});

router.delete('/:id', (req, res) => {

  // happy path: id is sent and it's a number and we find the dog and we delete the dog
  // sad path: id is wrong format, or dog not found

  // get id
  const id = Number(req.params.id);

  // find dog
  const match = quotes.find((quote) => quote.id === id);

  // delete dog if it exists
  if (match) {

    const quotesFilteredDeleted = quotes.filter((quote) => quote.id !== id);
    setQuotes(quotesFilteredDeleted)
    res.send(match);
    
  } 

  else {
    res.status(404).send({ error: 'Quote not found.' });
  }

});

router.patch('/:id', (req, res) => {

  const id = Number(req.params.id);

  // update keys from an existing resource
  // we only update existing keys
  // keys that are not in the resource should be ignored
  // or we should send the user an error
  // send back the updated resource

  // happy path: every key given exists and is the right type // ✅
  // sad path: wrong keys or wrong types provided by user // ❌

  const quoteToChange = quotes.find((quote) => quote.id === id);

  if (quoteToChange) {

    // we can only change the item if it exists
    if (typeof req.body.quote === 'string') quoteToChange.quote = req.body.quote;
  
    res.send(quoteToChange);

  } 
  
  else {
    res.status(404).send({ error: 'quote not found, id is now in db.' });
  }

});

router.put('/:id', (req, res) => {

  const id = Number(req.params.id);
  const quoteToChange = quotes.find((quote) => quote.id === id);

  if (quoteToChange) {

    // we can only change the item if it exists
    if (typeof req.body.quote === 'string') quoteToChange.quote = req.body.quote;
    
    res.send(quoteToChange);

  } 
  
  else {
    res.status(404).send({ error: 'quote not found, id is now in db.' });
  }

});
// #endregion

export default router