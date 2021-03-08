const models = require('../models');
const NotFoundError = require('../utils/errors/not-found-error');

/* -------------------------------------------------------------------------- */
/*                              GETTERS / SETTERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Finds all the quizzes.
 */
function findAll() {
  // Find the quizzes.
  return models.Quiz
    .findAll({
      include: [
        // Include the questions.
        {
          model: models.Question,
          as: 'questions',
          // Exclude foreign keys.
          attributes: {
            exclude: ['quizId']
          },
          include: [
            // Include the answers of the questions.
            {
              model: models.Answer,
              as: 'answers',
              // Exclude foreign keys.
              attributes: {
                exclude: ['questionId', 'quizId']
              }
            }
          ]
        }
      ],
      order: [
        // Order the quizzes.
        ['id', 'ASC'],

        // Order the questions.
        [{ model: models.Question, as: 'questions' }, 'id', 'ASC'],

        // Order the answers.
        [
          { model: models.Question, as: 'questions' },
          { model: models.Answer, as: 'answers' },
          'id',
          'ASC'
        ]
      ]
    });
}

/**
 * Finds a quiz by id.
 * @param id The id of the quiz.
 */
function find(id) {
  return models.Quiz
    .findByPk(
      id,
      {
        include: [
          // Include the questions.
          {
            model: models.Question,
            as: 'questions',
            // Exclude foreign keys.
            attributes: {
              exclude: ['quizId']
            },
            include: [
              // Include the answers of the questions.
              {
                model: models.Answer,
                as: 'answers',
                // Exclude foreign keys.
                attributes: {
                  exclude: ['questionId', 'quizId']
                }
              }
            ]
          }
        ],
        order: [
          // Order the questions.
          [{ model: models.Question, as: 'questions' }, 'id', 'ASC'],

          // Order the answers.
          [
            { model: models.Question, as: 'questions' },
            { model: models.Answer, as: 'answers' },
            'id',
            'ASC'
          ]
        ]
      }
    );
}

/**
 * Creates a quiz.
 * @param themeId The theme id of the quiz.
 * @param imageId The image id of the quiz.
 * @param name The name of the quiz.
 */
function create(themeId, imageId, name) {
  return models.Quiz
    .create({
      themeId,
      imageId,
      name
    });
}

/**
 * Updates a quiz by id.
 * @param id The id of the quiz.
 * @param themeId The theme id of the quiz.
 * @param imageId The image id of the quiz.
 * @param name The name of the quiz.
 */
function update(id, themeId, imageId, name) {
  return models.Quiz
    .update(
      {
        themeId,
        imageId,
        name
      },
      {
        where: { id }
      }
    );
}

/**
 * Destroys a quiz by id.
 * @param id The id of the quiz.
 */
function destroy(id) {
  return models.Quiz
    .destroy({
      where: { id }
    });
}

/* -------------------------------------------------------------------------- */
/*                                    PRINTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Prints all the quizzes.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFindAll(req, res, next) {
  findAll(req.params.quizId)
    .then((quizzes) => {
      res.status(200).json(quizzes);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints a quiz by id.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFind(req, res, next) {
  find(req.params.quizId)
    .then((quiz) => {
      if (quiz) {
        res.status(200).json(quiz);
      }
      // Quiz not found.
      next(new NotFoundError());
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the created quiz.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printCreate(req, res, next) {
  // Create the quiz.
  create(
    req.body.themeId,
    req.body.imageId,
    req.body.name
  )
    // eslint-disable-next-line arrow-body-style
    .then((quiz) => {
      // Find the quiz.
      return find(quiz.id)
        .then((foundQuiz) => {
          res.status(201).json(foundQuiz);
        });
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the updated quiz.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printUpdate(req, res, next) {
  // Update the quiz.
  update(
    req.params.quizId,
    req.body.themeId,
    req.body.imageId,
    req.body.name
  )
    .then((result) => {
      const updatedRows = result[0];
      if (updatedRows > 0) {
        // Find the quiz.
        return find(req.params.quizId)
          .then((quiz) => {
            res.status(200).json(quiz);
          });
      }
      // Quiz not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the destroyed quiz.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printDestroy(req, res, next) {
  // Find the quiz.
  find(req.params.quizId)
    .then((quiz) => {
      if (quiz) {
        // Destroy the quiz.
        return destroy(req.params.quizId)
          .then(() => {
            res.status(200).json(quiz);
          });
      }
      // Quiz not found.
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
