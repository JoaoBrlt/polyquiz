const models = require('../models');
const NotFoundError = require('../utils/errors/not-found-error');
const ValidationError = require('../utils/errors/validation-error');
const AlreadyExistsError = require('../utils/errors/already-exists-error');

/* -------------------------------------------------------------------------- */
/*                              GETTERS / SETTERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Finds the parent question result of the answer result.
 * @param resultId The id of the result.
 * @param questionId The id of the question.
 */
function findParentQuestionResult(resultId, questionId) {
  return models.QuestionResult
    .findOne({
      where: {
        resultId,
        questionId
      }
    });
}

/**
 * Finds the parent answer of the answer result.
 * @param answerId The id of the answer.
 */
function findParentAnswer(answerId) {
  return models.Answer
    .findOne({
      where: {
        id: answerId
      }
    });
}

/**
 * Finds all the answer results.
 * @param resultId The id of the result.
 * @param questionId The id of the question.
 */
function findAll(resultId, questionId) {
  // Find the parent question result.
  return findParentQuestionResult(resultId, questionId)
    .then((questionResult) => {
      if (questionResult) {
        // Find the question results.
        return questionResult
          .getAnswers({
            // Exclude some attributes.
            attributes: {
              exclude: ['id', 'questionResultId', 'createdAt', 'updatedAt']
            },
            order: [
              // Order the answers.
              ['id', 'ASC']
            ]
          });
      }
      // Question result not found.
      throw new NotFoundError();
    })
    // Transform array of answers to array answer ids.
    .then((foundAnswerResults) => {
      const answerResults = JSON.parse(JSON.stringify(foundAnswerResults));
      answerResults.forEach((answer, index) => {
        // eslint-disable-next-line no-param-reassign
        answerResults[index] = answer.answerId;
      });
      return answerResults;
    });
}

/**
 * Finds a question result by id.
 * @param resultId The id of the result.
 * @param questionId The id of the question.
 * @param answerId The id of the answer.
 */
function find(resultId, questionId, answerId) {
  // Find the parent question result.
  return findParentQuestionResult(resultId, questionId)
    .then((questionResult) => {
      if (questionResult) {
        // Find the answer result.
        return models.AnswerResult
          .findOne({
            // Exclude some attributes.
            attributes: {
              exclude: ['id', 'questionResultId', 'createdAt', 'updatedAt']
            },
            where: {
              questionResultId: questionResult.id,
              answerId
            }
          });
      }
      // Question result not found.
      throw new NotFoundError();
    });
}

/**
 * Creates a question result.
 * @param resultId The id of the parent result.
 * @param questionId The id of the question.
 * @param answerId The id of the answer.
 */
function create(resultId, questionId, answerId) {
  // Find the parent question result.
  return findParentQuestionResult(resultId, questionId)
    .then((questionResult) => {
      if (questionResult) {
        // Find the parent answer.
        return findParentAnswer(answerId)
          .then((answer) => {
            // Check the question id.
            if (answer && questionResult.questionId === answer.questionId) {
              // Find the answer result.
              return find(resultId, questionId, answerId)
                .then((answerResult) => {
                  if (!answerResult) {
                    // Create the answer result.
                    return models.AnswerResult
                      .create({
                        resultId,
                        questionResultId: questionResult.id,
                        answerId
                      });
                  }
                  // Answer result already exists.
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
 * Destroys an answer result by id.
 * @param resultId The id of the result.
 * @param questionId The id of the question.
 * @param answerId The id of the answer.
 */
function destroy(resultId, questionId, answerId) {
  // Find the parent question result.
  return findParentQuestionResult(resultId, questionId)
    .then((questionResult) => {
      if (questionResult) {
        // Destroy the answer result.
        return models.AnswerResult
          .destroy({
            where: {
              questionResultId: questionResult.id,
              answerId
            }
          });
      }
      // Question result not found.
      throw new NotFoundError();
    });
}

/* -------------------------------------------------------------------------- */
/*                                    PRINTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Prints all the answer results.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFindAll(req, res, next) {
  findAll(req.params.resultId, req.params.questionId)
    .then((answerResults) => {
      res.status(200).json(answerResults);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the created answer result.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printCreate(req, res, next) {
  // Create the answer result.
  create(
    req.params.resultId,
    req.params.questionId,
    req.params.answerId
  )
    // eslint-disable-next-line arrow-body-style
    .then(() => {
      // Find the answer result.
      return find(
        req.params.resultId,
        req.params.questionId,
        req.params.answerId
      )
        .then((answerResult) => {
          res.status(201).json(answerResult);
        });
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
  // Find the answer result.
  find(
    req.params.resultId,
    req.params.questionId,
    req.params.answerId
  )
    .then((answerResult) => {
      if (answerResult) {
        // Destroy the answer result.
        return destroy(
          req.params.resultId,
          req.params.questionId,
          req.params.answerId
        )
          .then(() => {
            res.status(200).json(answerResult);
          });
      }
      // Answer result not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

module.exports = {
  findAll,
  create,
  destroy,
  printFindAll,
  printCreate,
  printDestroy
};
