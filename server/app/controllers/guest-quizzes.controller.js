const models = require('../models');
const NotFoundError = require('../utils/errors/not-found-error');
const AlreadyExistsError = require('../utils/errors/already-exists-error');
const QuizController = require('./quiz.controller');

/* -------------------------------------------------------------------------- */
/*                              GETTERS / SETTERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Adds a quiz to the guest.
 * @param id The id of the guest.
 * @param quizId The id of the quiz to be added.
 */
function add(id, quizId) {
  // Find the guest.
  return models.Guest
    .findByPk(id)
    .then((guest) => {
      if (guest) {
        // If the guest has the quiz.
        return guest
          .hasQuiz(parseInt(quizId, 10))
          .then((hasQuiz) => {
            if (!hasQuiz) {
              // Add the quiz.
              return guest.addQuiz(quizId);
            }
            // Quiz already added.
            throw new AlreadyExistsError();
          });
      }
      // Guest not found.
      throw new NotFoundError();
    });
}

/**
 * Removes a quiz from a guest.
 * @param id The id of the guest.
 * @param quizId The id of the quiz to be deleted.
 */
function remove(id, quizId) {
  // Find the guest.
  return models.Guest
    .findByPk(id)
    .then((guest) => {
      if (guest) {
        // If the guest has the quiz.
        return guest
          .hasQuiz(parseInt(quizId, 10))
          .then((hasQuiz) => {
            if (hasQuiz) {
              // Remove the quiz.
              return guest.removeQuiz(quizId);
            }
            // Quiz not found.
            throw new NotFoundError();
          });
      }
      // Guest not found.
      throw new NotFoundError();
    });
}

/* -------------------------------------------------------------------------- */
/*                                    PRINTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Print the quiz added to a guest.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printAdd(req, res, next) {
  add(req.params.guestId, req.params.quizId)
    // eslint-disable-next-line arrow-body-style
    .then(() => {
      return QuizController
        .find(req.params.quizId)
        .then((quiz) => {
          res.status(201).json(quiz);
        });
    })
    .catch(next);
}

/**
 * Prints the quiz removed from a guest.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printRemove(req, res, next) {
  remove(req.params.guestId, req.params.quizId)
    // eslint-disable-next-line arrow-body-style
    .then(() => {
      return QuizController
        .find(req.params.quizId)
        .then((quiz) => {
          res.status(200).json(quiz);
        });
    })
    .catch(next);
}

module.exports = {
  add,
  printAdd,
  remove,
  printRemove
};
