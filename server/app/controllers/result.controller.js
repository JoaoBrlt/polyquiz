const models = require('../models');
const NotFoundError = require('../utils/errors/not-found-error');

/* -------------------------------------------------------------------------- */
/*                              GETTERS / SETTERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Finds all the results.
 */
function findAll() {
  return models.Result
    .findAll({
      // Include the question results.
      include: [
        {
          model: models.QuestionResult,
          as: 'questions',
          attributes: {
            exclude: ['id', 'resultId', 'createdAt', 'updatedAt']
          },
          // Include the answer results.
          include: [
            {
              model: models.AnswerResult,
              as: 'answers',
              attributes: {
                exclude: ['id', 'questionResultId', 'createdAt', 'updatedAt']
              }
            }
          ]
        }
      ],
      order: [
        // Order the results.
        ['id', 'ASC'],

        // Order the question results.
        [{ model: models.QuestionResult, as: 'questions' }, 'questionId', 'ASC'],

        // Order the answer results.
        [
          { model: models.QuestionResult, as: 'questions' },
          { model: models.AnswerResult, as: 'answers' },
          'id',
          'ASC'
        ]
      ]
    })
    // Transform array of answers to array answer ids.
    .then((foundResults) => {
      const results = JSON.parse(JSON.stringify(foundResults));
      results.forEach((result) => {
        result.questions.forEach((question) => {
          question.answers.forEach((answer, index) => {
            // eslint-disable-next-line no-param-reassign
            question.answers[index] = answer.answerId;
          });
        });
      });
      return results;
    });
}

/**
 * Finds a result by id.
 * @param id The id of the result.
 */
function find(id) {
  return models.Result.findByPk(
    id,
    {
      // Include the question results.
      include: [
        {
          model: models.QuestionResult,
          as: 'questions',
          attributes: {
            exclude: ['id', 'resultId', 'createdAt', 'updatedAt']
          },
          // Include the answer results.
          include: [
            {
              model: models.AnswerResult,
              as: 'answers',
              attributes: {
                exclude: ['id', 'questionResultId', 'createdAt', 'updatedAt']
              }
            }
          ]
        }
      ],
      order: [
        // Order the question results.
        [{ model: models.QuestionResult, as: 'questions' }, 'questionId', 'ASC'],

        // Order the answer results.
        [
          { model: models.QuestionResult, as: 'questions' },
          { model: models.AnswerResult, as: 'answers' },
          'id',
          'ASC'
        ]
      ]
    }
  )
    // Transform array of answers to array answer ids.
    .then((foundResult) => {
      const result = JSON.parse(JSON.stringify(foundResult));
      result.questions.forEach((question) => {
        question.answers.forEach((answer, index) => {
          // eslint-disable-next-line no-param-reassign
          question.answers[index] = answer.answerId;
        });
      });
      return result;
    });
}

/**
 * Creates a result.
 * @param guestId The id of the guest.
 * @param quizId The id of the quiz.
 * @param timedOut Whether the quiz has timed out, or not.
 */
function create(guestId, quizId, timedOut) {
  return models.Result
    .create({
      guestId,
      quizId,
      timedOut
    });
}

/**
 * Updates a result by id.
 * @param id The id of the result.
 * @param guestId The id of the result.
 * @param quizId The id of the result.
 * @param timedOut Whether the quiz has timed out, or not.
 */
function update(id, guestId, quizId, timedOut) {
  return models.Result
    .update(
      {
        guestId,
        quizId,
        timedOut
      },
      {
        where: { id }
      }
    );
}

/**
 * Destroys a result by id.
 * @param id The id of the result.
 */
function destroy(id) {
  return models.Result
    .destroy({
      where: { id }
    });
}

/* -------------------------------------------------------------------------- */
/*                                    PRINTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Prints all the results.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFindAll(req, res, next) {
  findAll()
    .then((results) => {
      res.status(200).json(results);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints a result by id.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFind(req, res, next) {
  find(req.params.resultId)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        // Result not found.
        next(new NotFoundError());
      }
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the created result.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printCreate(req, res, next) {
  // Create the result.
  create(
    req.body.guestId,
    req.body.quizId,
    req.body.timedOut
  )
    // eslint-disable-next-line arrow-body-style
    .then((result) => {
      // Find the result.
      return find(result.id)
        .then((foundResult) => {
          res.status(201).json(foundResult);
        });
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the updated result.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printUpdate(req, res, next) {
  // Update the result.
  update(
    req.params.resultId,
    req.body.guestId,
    req.body.quizId,
    req.body.timedOut
  )
    .then((result) => {
      const updatedRows = result[0];
      if (updatedRows > 0) {
        // Find the result.
        return find(req.params.resultId)
          .then((foundResult) => {
            res.status(200).json(foundResult);
          });
      }
      // Result not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the destroyed result.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printDestroy(req, res, next) {
  // Find the result.
  find(req.params.resultId)
    .then((result) => {
      if (result) {
        // Destroy the result.
        return destroy(req.params.resultId)
          .then(() => {
            res.status(200).json(result);
          });
      }
      // Result not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

module.exports = {
  findAll,
  create,
  find,
  update,
  destroy,
  printFindAll,
  printCreate,
  printFind,
  printUpdate,
  printDestroy
};
