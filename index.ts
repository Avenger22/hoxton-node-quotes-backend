// #region 'Importing stuff'
import express from 'express';
import quoteRouter from './resources/quotes';
import authorRouter from './resources/authors';

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
const PORT: number = 8000;
// #endregion

app.use('/quotes', quoteRouter);
app.use('/authors', authorRouter);

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Go to quotes directly: http://localhost:${PORT}/quotes`)
    console.log(`Go to quotes directly: http://localhost:${PORT}/authors`)
})