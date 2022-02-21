// #region 'Importing stuff'
import { Router } from 'express';
import {authorsController} from "../controllers/AuthorsController"
// #endregion

const router = Router();

// #region 'end points for authors'
router.patch('/:id', authorsController.authorPatch)
router.post('/', authorsController.authorPost)
router.get('/', authorsController.allAuthorsGet)
router.get('/:id', authorsController.individualAuthorGet)
router.delete('/:id', authorsController.individualAuthorDelete)
// #endregion

export default router