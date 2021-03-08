const models = require('../models');
const NotFoundError = require('../utils/errors/not-found-error');

/* -------------------------------------------------------------------------- */
/*                              GETTERS / SETTERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Finds the parent quiz of the question.
 * @param quizId The quiz id of the question.
 */
function findParentQuiz(quizId) {
  return models.Quiz
    .findOne({
      where: {
        id: quizId
      }
    });
}

/**
 * Finds all the questions of a quiz.
 * @param quizId The quiz id of the question.
 */
function findAll(quizId) {
  // Find the parent quiz.
  return findParentQuiz(quizId)
    .then((quiz) => {
      if (quiz) {
        // Find the questions.
        return quiz
          .getQuestions({
            // Exclude foreign keys.
            attributes: {
              exclude: ['quizId']
            },
            include: [
              // Include the answers.
              {
                model: models.Answer,
                as: 'answers',
                // Exclude foreign keys.
                attributes: {
                  exclude: ['questionId', 'quizId']
                }
              }
            ],
            order: [
              // Order the questions.
              ['id', 'ASC'],

              // Order the answers.
              [{ model: models.Answer, as: 'answers' }, 'id', 'ASC']
            ]
          });
      }
      // Quiz not found.
      throw new NotFoundError();
    });
}

/**
 * Finds an question by id.
 * @param id The id of the question.
 * @param quizId The quiz id of the question.
 */
function find(id, quizId) {
  return models.Question
    .findOne({
      // Exclude foreign keys.
      attributes: {
        exclude: ['quizId']
      },
      include: [
        // Include the answers.
        {
          model: models.Answer,
          as: 'answers',
          // Exclude foreign keys.
          attributes: {
            exclude: ['questionId', 'quizId']
          }
        }
      ],
      order: [
        // Order the answers.
        [{ model: models.Answer, as: 'answers' }, 'id', 'ASC']
      ],
      where: {
        id,
        quizId
      }
    });
}

/**
 * Creates a question.
 * @param quizId The quiz id of the question.
 * @param imageId The image id of the question.
 * @param label The label of the question.
 */
function create(quizId, imageId, label) {
  // Find the parent quiz.
  return findParentQuiz(quizId)
    .then((quiz) => {
      if (quiz) {
        // Create the question.
        return quiz
          .createQuestion({
            imageId,
            label
          });
      }
      // Quiz not found.
      throw new NotFoundError();
    });
}

/**
 * Updates a question by id.
 * @param id The id of the question.
 * @param quizId The quiz id of the question.
 * @param imageId The image id of the question.
 * @param label The label of the question.
 */
function update(id, quizId, imageId, label) {
  return models.Question
    .update(
      {
        imageId,
        label
      },
      {
        where: {
          id,
          quizId
        }
      }
    );
}

/**
 * Destroys a question by id.
 * @param id The id of the question.
 * @param quizId The quiz id of the question.
 */
function destroy(id, quizId) {
  return models.Question
    .destroy({
      where: {
        id,
        quizId
      }
    });
}

/* -------------------------------------------------------------------------- */
/*                                    PRINTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Prints all the questions.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFindAll(req, res, next) {
  findAll(req.params.quizId)
    .then((questions) => {
      res.status(200).json(questions);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints a question by id.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFind(req, res, next) {
  find(req.params.questionId, req.params.quizId)
    .then((question) => {
      if (question) {
        res.status(200).json(question);
      } else {
        // Question not found.
        next(new NotFoundError());
      }
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the created question.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printCreate(req, res, next) {
  // Create the question.
  create(
    req.params.quizId,
    req.body.imageId,
    req.body.label
  )
    // eslint-disable-next-line arrow-body-style
    .then((question) => {
      // Find the question.
      return find(question.id, req.params.quizId)
        .then((foundQuestion) => {
          res.status(201).json(foundQuestion);
        });
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the updated question.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printUpdate(req, res, next) {
  // Update the question.
  update(
    req.params.questionId,
    req.params.quizId,
    req.body.imageId,
    req.body.label
  )
    .then((result) => {
      const updatedRows = result[0];
      if (updatedRows > 0) {
        // Find the question.
        return find(req.params.questionId, req.params.quizId)
          .then((question) => {
            res.status(200).json(question);
          });
      }
      // Question not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the destroyed question.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printDestroy(req, res, next) {
  // Find the question.
  find(req.params.questionId, req.params.quizId)
    .then((question) => {
      if (question) {
        // Destroy the question.
        return destroy(req.params.questionId, req.params.quizId)
          .then(() => {
            res.status(200).json(question);
          });
      }
      // Question not found.
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
