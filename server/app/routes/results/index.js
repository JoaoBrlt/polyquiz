const { Router } = require('express');
const QuestionResultRouter = require('./questions');
const ResultController = require('../../controllers/result.controller');

const router = Router();

// Find all the results.
router.get('/', ResultController.printFindAll);

// Create a result.
router.post('/', ResultController.printCreate);

// Find a result by id.
router.get('/:resultId([0-9]+)', ResultController.printFind);

// Update a result by id.
router.put('/:resultId([0-9]+)', ResultController.printUpdate);

// Delete a result by id.
router.delete('/:resultId([0-9]+)', ResultController.printDestroy);

// Question result routes.
router.use('/:resultId([0-9]+)/questions', QuestionResultRouter);

module.exports = router;
