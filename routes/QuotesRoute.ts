import { Router } from 'express';
import {quotesController} from "../controllers/QuotesController"

const router = Router()

// #region 'end points for quotes'
router.patch('/:id', quotesController.quotePatch)
router.post('/', quotesController.quotePost)
router.get('/', quotesController.allQuotesGet)
router.get('/:id', quotesController.individualQuoteGet)
router.delete('/:id', quotesController.individualQuoteDelete)
router.put('/:id', quotesController.quotePut)
// #endregion

export default router