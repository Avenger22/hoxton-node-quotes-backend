// #region 'Importing stuff'
import { Router } from 'express';
import { authors, setAuthors, quotes, setQuotes } from '../mockData/mockData';
import { Author, Quote } from '../types/types'
import Database from 'better-sqlite3';
// #endregion

const db = new Database('./data.db', {
  verbose: console.log,
});

const router = Router();

// #region 'Sql Queries for endpoints'
const getAllAuthors = db.prepare(`SELECT * FROM authors;`);
const getAuthorById = db.prepare(`SELECT * FROM authors WHERE id=?;`);

const createAuthor = db.prepare(`
  INSERT INTO authors (name) VALUES (?);
`);

const updateAuthor = db.prepare(`
  UPDATE authors SET quote=? WHERE id=?;
`);

const deleteAuthor = db.prepare(`
  DELETE FROM authors WHERE id=?;
`);
// #endregion

// #region 'end points for authors'
router.patch('/:id', (req, res) => {

  const id = Number(req.params.id);
  const authorToChange = authors.find((author) => author.id === id);

  if (authorToChange) {

    // we can only change the item if it exists
    if (typeof req.body.firstName === 'string')  authorToChange.firstName = req.body.firstName;
    if (typeof req.body.lastName === 'string') authorToChange.lastName = req.body.lastName;
    if (typeof req.body.avatar === 'string') authorToChange.avatar = req.body.avatar;
    if (typeof req.body.age === 'number') authorToChange.age = req.body.age;
    
    res.send(authorToChange);

  } 
  
  else {
    res.status(404).send({ error: 'author not found, id is now in db.' });
  }

});
  
router.post('/', (req, res) => {

  const firstName = req.body.firstName;
  const avatar = req.body.avatar;
  const lastName = req.body.lastName
  const age = req.body.age

  const errors = [];

  const lastQuoteId = Math.max(...quotes.map((quote) => quote.id));
  const newId = lastQuoteId + 1;

  if (typeof firstName !== 'string') {
    errors.push(`FirstName missing or not a string.`);
  }

  if (typeof lastName !== 'string') {
    errors.push(`LastName missing or not a string.`);
  }

  if (typeof age !== 'number') {
    errors.push(`Age missing or not a number.`);
  }

  if (typeof avatar !== 'string') {
    errors.push(`Avatar missing or not a string.`);
  }

  if (errors.length === 0) {

    const newAuthor: Author = {
      id: Number(newId),
      firstName: firstName,
      lastName: lastName,
      age: Number(age),
      avatar: avatar,
    };
    
    authors.push(newAuthor);

    // @ts-ignore
    // quotes = [...quotes, newQuote]

    res.status(201).send(newAuthor);

  } 
  
  else {
    res.status(400).send({ errors: errors });
  }

});
  
router.get('/', (req, res) => {

  if (req.query.search) {

    let authorsToSend = authors
    let search = req.query.search as string

    if (typeof search === 'string') {

      console.log('Filtering authors with search:', search);
      authorsToSend = authorsToSend.filter((author) =>
        author.firstName.toUpperCase().includes(search.toUpperCase())
      );

    }

    res.send(authorsToSend)

  }

  else {

    const authorsCopy = JSON.parse(JSON.stringify(authors));

    for (const author of authorsCopy) {

      const authorQuotes = quotes.filter((quote) => quote.authorId === author.id);
      author.quotes = authorQuotes;
      
    }

    res.send(authorsCopy);

  }

})
  
router.get('/:id', (req, res) => {

  const id = String(req.params.id)
  const match = authors.find((author) => author.id === Number(id))
  
  if (match) {
    res.send(match)
  } 
  
  else {
    res.status(404).send({ error: 'author not found.' })
  }

})
  
router.delete('/:id', (req, res) => {

  // happy path: id is sent and it's a number and we find the dog and we delete the dog
  // sad path: id is wrong format, or dog not found

  // get id
  const id = Number(req.params.id);

  // find dog
  const match = authors.find((author) => author.id === id);

  // delete dog if it exists
  if (match) {

    const authorsFilteredDeleted = authors.filter((author) => author.id !== id);
    setAuthors(authorsFilteredDeleted)
    res.send(match);
    
  } 

  else {
    res.status(404).send({ error: 'Quote not found.' });
  }

});
// #endregion

export default router