const { Router } = require('express');
const QuestionRouter = require('./questions');
const QuizController = require('../../controllers/quiz.controller');

const router = Router();

// Find all the quizzes.
router.get('/', QuizController.printFindAll);

// Create a quiz.
router.post('/', QuizController.printCreate);

// Find a quiz by id.
router.get('/:quizId([0-9]+)', QuizController.printFind);

// Update a quiz by id.
router.put('/:quizId([0-9]+)', QuizController.printUpdate);

// Delete a quiz by id.
router.delete('/:quizId([0-9]+)', QuizController.printDestroy);

// Questions routes.
router.use('/:quizId([0-9]+)/questions', QuestionRouter);

module.exports = router;
