const models = require('../models');
const NotFoundError = require('../utils/errors/not-found-error');
const ValidationError = require('../utils/errors/validation-error');
const AlreadyExistsError = require('../utils/errors/already-exists-error');

/* -------------------------------------------------------------------------- */
/*                              GETTERS / SETTERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Finds the parent result of the question result.
 * @param resultId The id of the result.
 */
function findParentResult(resultId) {
  return models.Result
    .findOne({
      where: {
        id: resultId
      }
    });
}

/**
 * Finds the parent question of the question result.
 * @param questionId The id of the question.
 */
function findParentQuestion(questionId) {
  return models.Question
    .findOne({
      where: {
        id: questionId
      }
    });
}

/**
 * Finds all the question results.
 * @param resultId The id of the result.
 */
function findAll(resultId) {
  // Find the parent result.
  return findParentResult(resultId)
    .then((result) => {
      if (result) {
        // Find the question results.
        return result
          .getQuestions({
            // Exclude some attributes.
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
            ],
            order: [
              // Order the questions.
              ['questionId', 'ASC'],

              // Order the answers.
              [{ model: models.AnswerResult, as: 'answers' }, 'id', 'ASC']
            ]
          });
      }
      // Result not found.
      throw new NotFoundError();
    })
    // Transform array of answers to array answer ids.
    .then((foundQuestionResults) => {
      const questionResults = JSON.parse(JSON.stringify(foundQuestionResults));
      questionResults.forEach((questionResult) => {
        questionResult.answers.forEach((answer, index) => {
          // eslint-disable-next-line no-param-reassign
          questionResult.answers[index] = answer.answerId;
        });
      });
      return questionResults;
    });
}

/**
 * Finds a question result by id.
 * @param resultId The id of the result.
 * @param questionId The id of the question.
 */
function find(resultId, questionId) {
  return models.QuestionResult
    .findOne({
      // Exclude some attributes.
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
      ],
      order: [
        // Order the answers.
        [{ model: models.AnswerResult, as: 'answers' }, 'id', 'ASC']
      ],
      where: {
        resultId,
        questionId
      }
    })
    // Transform array of answers to array answer ids.
    .then((foundQuestionResult) => {
      if (foundQuestionResult) {
        const questionResult = JSON.parse(JSON.stringify(foundQuestionResult));
        questionResult.answers.forEach((answer, index) => {
          // eslint-disable-next-line no-param-reassign
          questionResult.answers[index] = answer.answerId;
        });
        return questionResult;
      }
      return foundQuestionResult;
    });
}

/**
 * Creates a question result.
 * @param resultId The id of the parent result.
 * @param questionId The id of the question.
 * @param skipped Whether the question has been skipped, or not.
 */
function create(resultId, questionId, skipped) {
  // Find the parent result.
  return findParentResult(resultId)
    .then((result) => {
      if (result) {
        // Find the parent question.
        return findParentQuestion(questionId)
          .then((question) => {
            // Check the quiz id.
            if (question && question.quizId === result.quizId) {
              // Find the question result.
              return find(resultId, questionId)
                .then((questionResult) => {
                  if (!questionResult) {
                    // Create the question result.
                    return models.QuestionResult
                      .create({
                        resultId,
                        questionId,
                        skipped
                      });
                  }
                  // Question result already exists.
                  throw new AlreadyExistsError();
                });
            }
            // Invalid question or quiz.
            throw new ValidationError();
          });
      }
      // Result not found.
      throw new NotFoundError();
    });
}

/**
 * Updates a question result by id.
 * @param resultId The id of the result.
 * @param questionId The id of the question.
 * @param skipped Whether the question has been skipped, or not.
 */
function update(resultId, questionId, skipped) {
  return models.QuestionResult
    .update(
      {
        skipped
      },
      {
        where: {
          resultId,
          questionId
        }
      }
    );
}

/**
 * Destroys a question result by id.
 * @param resultId The id of the result.
 * @param questionId The id of the question.
 */
function destroy(resultId, questionId) {
  return models.QuestionResult
    .destroy({
      where: {
        resultId,
        questionId
      }
    });
}

/* -------------------------------------------------------------------------- */
/*                                    PRINTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Prints all the question results.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFindAll(req, res, next) {
  findAll(req.params.resultId)
    .then((questionResults) => {
      res.status(200).json(questionResults);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints a question result by id.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFind(req, res, next) {
  find(req.params.resultId, req.params.questionId)
    .then((questionResult) => {
      if (questionResult) {
        res.status(200).json(questionResult);
      } else {
        // Question result not found.
        next(new NotFoundError());
      }
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the created question result.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printCreate(req, res, next) {
  // Create the question result.
  create(
    req.params.resultId,
    req.params.questionId,
    req.body.skipped
  )
    // eslint-disable-next-line arrow-body-style
    .then(() => {
      // Find the question result.
      return find(req.params.resultId, req.params.questionId)
        .then((questionResult) => {
          res.status(201).json(questionResult);
        });
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the updated question result.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printUpdate(req, res, next) {
  // Update the question result.
  update(
    req.params.resultId,
    req.params.questionId,
    req.body.skipped
  )
    .then((result) => {
      const updatedRows = result[0];
      if (updatedRows > 0) {
        // Find the question result.
        return find(req.params.resultId, req.params.questionId)
          .then((questionResult) => {
            res.status(200).json(questionResult);
          });
      }
      // Question result not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the destroyed question result.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printDestroy(req, res, next) {
  // Find the question result.
  find(req.params.resultId, req.params.questionId)
    .then((questionResult) => {
      if (questionResult) {
        // Destroy the question result.
        return destroy(req.params.resultId, req.params.questionId)
          .then(() => {
            res.status(200).json(questionResult);
          });
      }
      // Question result not found.
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
