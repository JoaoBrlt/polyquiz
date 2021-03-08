const { Router } = require('express');
const AnswerRouter = require('./answers');
const QuestionController = require('../../../controllers/question.controller');

const router = Router({ mergeParams: true });

// Find all the questions.
router.get('/', QuestionController.printFindAll);

// Insert a question.
router.post('/', QuestionController.printCreate);

// Find a question by id.
router.get('/:questionId([0-9]+)', QuestionController.printFind);

// Update a question by id.
router.put('/:questionId([0-9]+)', QuestionController.printUpdate);

// Delete a question by id.
router.delete('/:questionId([0-9]+)', QuestionController.printDestroy);

// Answer routes.
router.use('/:questionId([0-9]+)/answers', AnswerRouter);

module.exports = router;
