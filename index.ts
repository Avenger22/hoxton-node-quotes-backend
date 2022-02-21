// #region 'Importing stuff and DB configuration'
import express from 'express';
import quotesRoute from './routes/QuotesRoute';
import authorsRoute from './routes/AuthorsRoute';
import {generalServerController} from "./controllers/generalServerController"

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const PORT: number = 8000;
// #endregion

// #region 'Some general endpoints'
app.use('/quotes', quotesRoute);
app.use('/authors', authorsRoute);

app.get('/', generalServerController.getHome)
app.get('/db', generalServerController.getDb)
app.get('/random', generalServerController.getRandom)
app.get('/authorsJoin', generalServerController.allAuthorsGetWithJoin)
// #endregion

// #region 'Console logging the server'
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Go to quotes directly: http://localhost:${PORT}/quotes`)
    console.log(`Go to quotes directly: http://localhost:${PORT}/authors`)
})
// #endregion