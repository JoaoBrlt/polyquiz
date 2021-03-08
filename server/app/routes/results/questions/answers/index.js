const { Router } = require('express');
const AnswerResultController = require('../../../../controllers/answer-result.controller');

const router = Router({ mergeParams: true });

// Find all the answer results.
router.get('/', AnswerResultController.printFindAll);

// Create an answer result.
router.post('/:answerId([0-9]+)', AnswerResultController.printCreate);

// Delete an answer result by id.
router.delete('/:answerId([0-9]+)', AnswerResultController.printDestroy);

module.exports = router;
