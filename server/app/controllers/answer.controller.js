const models = require('../models');
const NotFoundError = require('../utils/errors/not-found-error');
const LimitReachedError = require('../utils/errors/limit-reached-error');

/* -------------------------------------------------------------------------- */
/*                              GETTERS / SETTERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Finds the parent question of the answer.
 * @param questionId The question id of the answer.
 * @param quizId The quiz id of the answer.
 */
function findParentQuestion(questionId, quizId) {
  return models.Question
    .findOne({
      where: {
        id: questionId,
        quizId
      }
    });
}

/**
 * Finds all the answers of a question.
 * @param questionId The question id of the answer.
 * @param quizId The quiz id of the answer.
 */
function findAll(questionId, quizId) {
  // Find the parent question.
  return findParentQuestion(questionId, quizId)
    .then((question) => {
      if (question) {
        // Find the answers.
        return question
          .getAnswers({
            // Exclude the foreign keys.
            attributes: {
              exclude: ['questionId', 'quizId']
            },
            // Order the answers.
            order: [['id', 'ASC']]
          });
      }
      // Question not found.
      throw new NotFoundError();
    });
}

/**
 * Finds an answer by id.
 * @param id The id of the answer.
 * @param questionId The question id of the answer.
 * @param quizId The quiz id of the answer.
 */
function find(id, questionId, quizId) {
  return models.Answer
    .findOne({
      // Exclude the foreign keys.
      attributes: {
        exclude: ['questionId', 'quizId']
      },
      where: {
        id,
        questionId,
        quizId
      }
    });
}

/**
 * Creates an answer.
 * @param questionId The question id of the answer.
 * @param quizId The quiz id of the answer.
 * @param imageId The image id of the answer.
 * @param value The value of the answer.
 * @param isCorrect Whether the answer is correct or not.
 */
function create(questionId, quizId, imageId, value, isCorrect) {
  // Find the parent question.
  return findParentQuestion(questionId, quizId)
    .then((question) => {
      if (question) {
        // Count the answers.
        return question
          .countAnswers()
          .then((number) => {
            if (number < 4) {
              // Create the answer.
              return question
                .createAnswer({
                  quizId,
                  imageId,
                  value,
                  isCorrect
                });
            }
            // Too many answers.
            throw new LimitReachedError();
          });
      }
      // Question not found.
      throw new NotFoundError();
    });
}

/**
 * Updates an answer by id.
 * @param id The id of the answer.
 * @param questionId The question id of the answer.
 * @param quizId The quiz id of the answer.
 * @param imageId The image id of the answer.
 * @param value The value of the answer.
 * @param isCorrect Whether the answer is correct or not.
 */
function update(id, questionId, quizId, imageId, value, isCorrect) {
  return models.Answer
    .update(
      {
        imageId,
        value,
        isCorrect
      },
      {
        where: {
          id,
          questionId,
          quizId
        }
      }
    );
}

/**
 * Destroys an answer by id.
 * @param id The id of the answer.
 * @param questionId The question id of the answer.
 * @param quizId The quiz id of the answer.
 */
function destroy(id, questionId, quizId) {
  return models.Answer
    .destroy({
      where: {
        id,
        questionId,
        quizId
      }
    });
}

/* -------------------------------------------------------------------------- */
/*                                    PRINTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Prints all the answers.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFindAll(req, res, next) {
  findAll(req.params.questionId, req.params.quizId)
    .then((answers) => {
      res.status(200).json(answers);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints an answer by id.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFind(req, res, next) {
  find(req.params.answerId, req.params.questionId, req.params.quizId)
    .then((answer) => {
      if (answer) {
        res.status(200).json(answer);
      } else {
        // Answer not found.
        next(new NotFoundError());
      }
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the created answer.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printCreate(req, res, next) {
  // Create the answer.
  create(
    req.params.questionId,
    req.params.quizId,
    req.body.imageId,
    req.body.value,
    req.body.isCorrect
  )
    // eslint-disable-next-line arrow-body-style
    .then((answer) => {
      // Find the answer.
      return find(answer.id, req.params.questionId, req.params.quizId)
        .then((foundAnswer) => {
          res.status(201).json(foundAnswer);
        });
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the updated answer.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printUpdate(req, res, next) {
  // Update the answer.
  update(
    req.params.answerId,
    req.params.questionId,
    req.params.quizId,
    req.body.imageId,
    req.body.value,
    req.body.isCorrect
  )
    .then((result) => {
      const updatedRows = result[0];
      if (updatedRows > 0) {
        // Find the answer.
        return find(req.params.answerId, req.params.questionId, req.params.quizId)
          .then((answer) => {
            res.status(200).json(answer);
          });
      }
      // Answer not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the destroyed answer.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printDestroy(req, res, next) {
  // Find the answer.
  find(req.params.answerId, req.params.questionId, req.params.quizId)
    .then((answer) => {
      if (answer) {
        // Destroy the answer.
        return destroy(req.params.answerId, req.params.questionId, req.params.quizId)
          .then(() => {
            res.status(200).json(answer);
          });
      }
      // Answer not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

module.exports = {
  findAll,
  printFindAll,
  create,
  printCreate,
  find,
  printFind,
  update,
  printUpdate,
  destroy,
  printDestroy
};
