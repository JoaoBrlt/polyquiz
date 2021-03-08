const { Router } = require('express');
const AnswerController = require('../../../../controllers/answer.controller');

const router = Router({ mergeParams: true });

// Find all the answers.
router.get('/', AnswerController.printFindAll);

// Insert a answer.
router.post('/', AnswerController.printCreate);

// Find a answer by id.
router.get('/:answerId([0-9]+)', AnswerController.printFind);

// Update a answer by id.
router.put('/:answerId([0-9]+)', AnswerController.printUpdate);

// Delete a answer by id.
router.delete('/:answerId([0-9]+)', AnswerController.printDestroy);

module.exports = router;
