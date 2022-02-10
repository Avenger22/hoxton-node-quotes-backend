import express from 'express';
import cors from 'cors'
import {
    quotes
} from "./db/db"
import {Quote} from "./types/types"

const app = express();
// const cors = require('cors');
app.use(cors());
const PORT: number = 8000;


app.get('/', (req, res) => {
    res.send('Welcome to AlbVitaFitness!!!!, use / and arrays for navigation in the backend server');
});

app.get('/random', (req, res) => {
    const randomQuote: Quote = quotes[Math.floor(Math.random() * quotes.length)]
    res.send(randomQuote);
});

app.get('/quotes', (req, res) => {
    res.send(quotes);
});

app.get('/quotes/:author', (req, res) => {

    const author = String(req.params.author)
    const match = quotes.find((quote) => quote.author === author)
    
    if (match) {
      res.send(match)
    } 
    
    else {
      res.status(404).send({ error: 'Quote not found.' })
    }
  
})

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})