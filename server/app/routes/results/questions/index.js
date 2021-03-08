const { Router } = require('express');
const AnswerResultRouter = require('./answers');
const QuestionResultController = require('../../../controllers/question-result.controller');

const router = Router({ mergeParams: true });

// Find all the question results.
router.get('/', QuestionResultController.printFindAll);

// Create a question result.
router.post('/:questionId([0-9]+)', QuestionResultController.printCreate);

// Find a question result by id.
router.get('/:questionId([0-9]+)', QuestionResultController.printFind);

// Update a question result by id.
router.put('/:questionId([0-9]+)', QuestionResultController.printUpdate);

// Delete a question result by id.
router.delete('/:questionId([0-9]+)', QuestionResultController.printDestroy);

// Answer result routes.
router.use('/:questionId([0-9]+)/answers', AnswerResultRouter);

module.exports = router;
