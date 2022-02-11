// #region 'Importing stuff'
import express from 'express';

import {
    quotes
} from "./db/db"

import {Quote} from "./types/types"

const app = express();
const cors = require('cors');
app.use(cors());
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
  
    if (search) {
      quotesToSend = quotesToSend.filter(quote =>
        quote.quote.toUpperCase().includes(search.toUpperCase())
      )
    }
  
    for (const key in req.query) {
      const query = req.query[key]
      const quoteKeys = Object.keys(quotes[0])
  
      if (quoteKeys.includes(key)) {
        quotesToSend = quotesToSend.filter(
          // @ts-ignore
          quote => String(quote[key]) === query
        )
      }
    }
  
    res.send(quotesToSend)

})
// #endregion

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Go to quotes directly: http://localhost:${PORT}/quotes`)
})