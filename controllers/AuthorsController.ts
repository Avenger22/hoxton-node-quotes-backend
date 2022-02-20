import {
    getAllAuthors, getAuthorById, deleteAuthor, updateAuthor, createAuthor
} from '../models/AuthorsModel'

// #region 'Creating controllers logic for routers to use'
export const authorsController = {

    allAuthorsGet: (req: any, res: any) => {
        
        if (req.query.search) {
        
            let search = req.query.search as string
        
            if (typeof search === 'string') {
            
                const allAuthors: any = getAllAuthors.all();
                res.send(allAuthors)
        
            }
            
        }
        
        else {
        
            const allAuthors: any = getAllAuthors.all();
            res.send(allAuthors)
        
        }
        
    },

    individualAuthorGet: (req: any, res: any) => {

        const id = String(req.params.id)
        const author = getAuthorById.get(id);

        if (author) {
            res.send(author);
        } 
        
        else {
            res.status(404).send({ error: 'Author not found.' });
        }

    },

    individualAuthorDelete: (req: any, res: any) => {

        const id = Number(req.params.id);
        const result = deleteAuthor.run(id);

        console.log('result:', result);

        if (result.changes !== 0) {
            res.send({ message: 'User deleted successfully.' });
        } 
        
        else {
            res.status(404).send({ error: 'User does not exist.' });
        }
        
    },

    authorPost: (req: any, res: any) => {

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

            // @ts-ignore
            const result: any = createAuthor.run(firstName, lastName, age, avatar);

            // get the user we just created on the DB
            const author = getAuthorById.get(result.lastInsertRowid);
            res.send(author);

        } 
        
        else {
            res.status(400).send({ errors: errors });
        }

    },

    authorPatch: (req: any, res: any) => {

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

    }

}
// #endregion