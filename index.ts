// #region 'Importing stuff'
import express from 'express';
import {
    quotes, setQuotes
} from "./db/db"
import {Quote} from "./types/types"

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const PORT: number = 8000;
// #endregion

// #region 'End points in the backend'
app.get('/', (req, res) => {

    res.send(
      
        `<p style="display:grid; place-items: center; font-size: 26px; color: #000; font-weight: 900;">Welcome to Quotes, use / and arrays for navigation in the backend server</p>
      
        <div style = "display: grid; grid-template-rows: repeat(3,3.33fr); grid-gap: 35px; place-items:center; background-color: #191919; height: 100vh; margin: 0 0; paddig: 0 0; box-sizing: border-box;">
            
            <a style="color: #fff; text-decoration: none; font-size: 22px;" href = "/quotes">Go to Quotes</a>
            
            <a style="color: #fff; text-decoration: none; font-size: 22px;">
                If you want to go to individual items just add an number id after / like quotes/1 gets the first quote etc
            </a>

            <a style="color: #fff; text-decoration: none; font-size: 22px;">
                If you want to get random object from the array you can have endpoint random-["name of the array"] and you have use it in front end etc
            </a>

        </div>`

    );
  
});

app.get('/random', (req, res) => {
    const randomQuote: Quote = quotes[Math.floor(Math.random() * quotes.length)]
    res.send(randomQuote);
});

app.get('/quotes/:id', (req, res) => {

    const id = String(req.params.id)
    const match = quotes.find((quote) => quote.id === Number(id))
    
    if (match) {
      res.send(match)
    } 
    
    else {
      res.status(404).send({ error: 'Quote not found.' })
    }
  
})

app.get('/quotes', (req, res) => {

  let quotesToSend = quotes
  let search = req.query.search as string

  // if (search) {
  //   quotesToSend = quotesToSend.filter(quote =>
  //     quote.quote.toUpperCase().includes(search.toUpperCase())
  //   )
  // }

  // for (const key in req.query) {
  //   const query = req.query[key]
  //   const quoteKeys = Object.keys(quotes[0])

  //   if (quoteKeys.includes(key)) {
  //     quotesToSend = quotesToSend.filter(
  //       // @ts-ignore
  //       quote => String(quote[key]) === query
  //     )
  //   }
  // }

  // const idFrom = Number(req.query.idFrom)
  // const idTo = Number(req.query.idTo)

  if (typeof search === 'string') {

    console.log('Filtering dogs with search:', search);
    quotesToSend = quotesToSend.filter((quote) =>
      quote.firstName.toUpperCase().includes(search.toUpperCase())
    );

  }
  
  res.send(quotesToSend)

})

app.post('/quotes', (req, res) => {

  const firstName = req.body.firstName;
  const avatar = req.body.avatar;
  const lastName = req.body.lastName
  const age = req.body.age
  const quote = req.body.quote

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

  if (typeof quote !== 'string') {
    errors.push(`Quote missing or not a string.`);
  }

  if (typeof avatar !== 'string') {
    errors.push(`Avatar missing or not a string.`);
  }

  if (errors.length === 0) {

    const newQuote: Quote = {
      id: Number(newId),
      firstName: firstName,
      lastName: lastName,
      quote: quote,
      age: Number(age),
      avatar: avatar,
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

app.delete('/quotes/:id', (req, res) => {

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

app.patch('/quotes/:id', (req, res) => {

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
    if (typeof req.body.firstName === 'string')  quoteToChange.firstName = req.body.firstName;
    if (typeof req.body.lastName === 'string') quoteToChange.lastName = req.body.lastName;
    if (typeof req.body.avatar === 'string') quoteToChange.avatar = req.body.avatar;
    if (typeof req.body.quote === 'string') quoteToChange.quote = req.body.quote;
    if (typeof req.body.age === 'number') quoteToChange.age = req.body.age;
    
    res.send(quoteToChange);

  } 
  
  else {
    res.status(404).send({ error: 'quote not found, id is now in db.' });
  }

});

app.put('/quotes/:id', (req, res) => {

  const id = Number(req.params.id);
  const quoteToChange = quotes.find((quote) => quote.id === id);

  if (quoteToChange) {

    // we can only change the item if it exists
    if (typeof req.body.firstName === 'string')  quoteToChange.firstName = req.body.firstName;
    if (typeof req.body.lastName === 'string') quoteToChange.lastName = req.body.lastName;
    if (typeof req.body.avatar === 'string') quoteToChange.avatar = req.body.avatar;
    if (typeof req.body.quote === 'string') quoteToChange.quote = req.body.quote;
    if (typeof req.body.age === 'number') quoteToChange.age = req.body.age;
    
    res.send(quoteToChange);

  } 
  
  else {
    res.status(404).send({ error: 'quote not found, id is now in db.' });
  }

});
// #endregion

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Go to quotes directly: http://localhost:${PORT}/quotes`)
})