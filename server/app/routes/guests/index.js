const { Router } = require('express');
const GuestQuizzesRouter = require('./quizzes');
const GuestController = require('../../controllers/guest.controller');

const router = Router();

// Find all the guests.
router.get('/', GuestController.printFindAll);

// Create a guest.
router.post('/', GuestController.printCreate);

// Find a guest by id.
router.get('/:guestId([0-9]+)', GuestController.printFind);

// Update a guest by id.
router.put('/:guestId([0-9]+)', GuestController.printUpdate);

// Delete a guest by id.
router.delete('/:guestId([0-9]+)', GuestController.printDestroy);

// Guest quizzes routes.
router.use('/:guestId([0-9]+)/quizzes', GuestQuizzesRouter);

module.exports = router;
