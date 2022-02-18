// #region 'Importing stuff'
import { Router } from 'express';
import { db } from '../setupDb';
import { createAuthor } from '../setupDb';
// #endregion

const router = Router();

// #region 'Sql Queries for endpoints'
const getAllAuthors = db.prepare(`SELECT * FROM authors;`);
const getAuthorById = db.prepare(`SELECT * FROM authors WHERE id=?;`);

const updateAuthor = db.prepare(`
  UPDATE authors SET firstName = ?, lastName = ?, age = ?, avatar = ? WHERE id=?;
`);

const deleteAuthor = db.prepare(`
  DELETE FROM authors WHERE id=?;
`);
// #endregion

// #region 'end points for authors'
router.patch('/:id', (req, res) => {

  const id = Number(req.params.id);

  const firstName = req.body.firstName;
  const lastName = req.body.lastName
  const age = req.body.age
  const avatar = req.body.avatar

  // check if the id given actually exists
  const result = getAuthorById.get(id);

  // if it does exist:
  if (result) {

    // change the user in the DB
    updateAuthor.run(firstName,lastName, age, avatar, id);

    // get the updated user from the DB
    const updatedAuthor = getAuthorById.get(id);

    // send the updated user back
    res.send(updatedAuthor);

  }

  // if it doesn't exist:
  else {
    res.status(404).send({ error: 'Author does not exist.' });
  }

});
  
router.post('/', (req, res) => {

  const firstName = req.body.firstName;
  const avatar = req.body.avatar;
  const lastName = req.body.lastName
  const age = req.body.age
  const errors = [];

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

    // create the user on the DB
    const result: any = createAuthor.run(firstName, lastName, age, avatar);

    // get the user we just created on the DB
    const author = getAuthorById.get(result.lastInsertRowid);
    res.send(author);

  } 
  
  else {
    res.status(400).send({ errors: errors });
  }

});
  
router.get('/', (req, res) => {

  if (req.query.search) {

    let search = req.query.search as string

    if (typeof search === 'string') {

      console.log('Filtering authors with search:', search);

      const allAuthors = getAllAuthors.all();
      res.send(allAuthors)

    }
    
  }

  else {

    const allAuthors = getAllAuthors.all();
    res.send(allAuthors)

  }

})
  
router.get('/:id', (req, res) => {

  const id = String(req.params.id)
  const author = getAuthorById.get(id);

  if (author) {
    res.send(author);
  } 
  
  else {
    res.status(404).send({ error: 'Author not found.' });
  }

})
  
router.delete('/:id', (req, res) => {

  // get id
  const id = Number(req.params.id);
  const result = deleteAuthor.run(id);

  console.log('result:', result);

  if (result.changes !== 0) {
    res.send({ message: 'User deleted successfully.' });
  } 
  
  else {
    res.status(404).send({ error: 'User does not exist.' });
  }

});
// #endregion

export default router