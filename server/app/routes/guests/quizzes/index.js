const { Router } = require('express');
const GuestQuizzesController = require('../../../controllers/guest-quizzes.controller');

const router = Router({ mergeParams: true });

// Add a quiz to a guest.
router.post('/:quizId([0-9]+)', GuestQuizzesController.printAdd);

// Remove a quiz from a guest.
router.delete('/:quizId([0-9]+)', GuestQuizzesController.printRemove);

module.exports = router;
