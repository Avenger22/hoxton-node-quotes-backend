// #region 'Importing stuff'
import express from 'express';
import quoteRouter from './resources/quotes';
import authorRouter from './resources/authors';
import { quotes, authors } from './db/db';
import { Quote, Author } from './types/types'

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const PORT: number = 8000;
// #endregion

app.use('/quotes', quoteRouter);
app.use('/authors', authorRouter);

app.get('/', (req, res) => {

    res.send(
      
        `<p style="display:grid; place-items: center; font-size: 26px; color: #000; font-weight: 900;">Welcome to Quotes, use / and arrays for navigation in the backend server</p>
      
        <div style = "display: grid; grid-template-rows: repeat(4, 3.33fr); grid-gap: 35px; place-items:center; background-color: #191919; height: 100vh; margin: 0 0; paddig: 0 0; box-sizing: border-box;">
            
            <a style="color: #fff; text-decoration: none; font-size: 22px;" href = "/quotes">Go to Quotes</a>
            
            <a style="color: #fff; text-decoration: none; font-size: 22px;" href = "/authors">Go to Authors</a>

            <a style="color: #fff; text-decoration: none; font-size: 22px;">
                If you want to go to individual items just add an number id after / like quotes/1 gets the first quote etc
            </a>

            <a style="color: #fff; text-decoration: none; font-size: 22px;">
                If you want to get random object from the array you can have endpoint random-["name of the array"] and you have use it in front end etc
            </a>

        </div>`

    );
  
});

app.get('/db', (req,res) => {
  const db = {"quotes": quotes, "authors": authors}
  res.send(db)
})

app.get('/random', (req, res) => {
    const randomQuote: Quote = quotes[Math.floor(Math.random() * quotes.length)]
    res.send(randomQuote);
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Go to quotes directly: http://localhost:${PORT}/quotes`)
    console.log(`Go to quotes directly: http://localhost:${PORT}/authors`)
})