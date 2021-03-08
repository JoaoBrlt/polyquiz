const models = require('../models');
const NotFoundError = require('../utils/errors/not-found-error');

/* -------------------------------------------------------------------------- */
/*                              GETTERS / SETTERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Finds all the guests.
 */
function findAll() {
  return models.Guest
    .findAll({
      // Include the quizzes.
      include: {
        model: models.Quiz,
        as: 'quizzes',
        attributes: ['id'],
        through: {
          attributes: []
        }
      },

      order: [
        // Order the guests.
        ['id', 'ASC'],

        // Order the quizzes.
        [{ model: models.Quiz, as: 'quizzes' }, 'id', 'ASC']
      ]
    })
    // Transform array of quizzes to array quiz ids.
    .then((result) => {
      const guests = JSON.parse(JSON.stringify(result));
      guests.forEach((guest) => {
        guest.quizzes.forEach((quiz, index) => {
          // eslint-disable-next-line no-param-reassign
          guest.quizzes[index] = quiz.id;
        });
      });
      return guests;
    });
}

/**
 * Finds a guest by id.
 * @param id The id of the guest.
 */
function find(id) {
  return models.Guest
    .findByPk(
      id,
      // Include the quizzes.
      {
        include: {
          model: models.Quiz,
          as: 'quizzes',
          attributes: ['id'],
          through: {
            attributes: []
          }
        },
        order: [
          // Order the quizzes.
          [{ model: models.Quiz, as: 'quizzes' }, 'id', 'ASC']
        ]
      }
    )
    // Transform array of quizzes to array quiz ids.
    .then((result) => {
      if (result) {
        const guest = JSON.parse(JSON.stringify(result));
        guest.quizzes.forEach((quiz, index) => {
          guest.quizzes[index] = quiz.id;
        });
        return guest;
      }
      // Guest not found.
      throw new NotFoundError();
    });
}

/**
 * Creates a guest.
 * @param firstName The first name of the guest.
 * @param lastName The last name of the guest.
 * @param accessibility The accessibility profile of the guest.
 */
function create(firstName, lastName, accessibility) {
  return models.Guest
    .create({
      firstName,
      lastName,
      accessibility
    });
}

/**
 * Updates a guest by id.
 * @param id The id of the guest.
 * @param firstName The first name of the guest.
 * @param lastName The last name of the guest.
 * @param accessibility The accessibility profile of the guest.
 */
function update(id, firstName, lastName, accessibility) {
  return models.Guest
    .update(
      {
        firstName,
        lastName,
        accessibility
      },
      {
        where: { id }
      }
    );
}

/**
 * Destroys a guest by id.
 * @param id The id of the guest.
 */
function destroy(id) {
  return models.Guest
    .destroy({
      where: { id }
    });
}

/* -------------------------------------------------------------------------- */
/*                                    PRINTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Prints all the guests.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFindAll(req, res, next) {
  findAll()
    .then((guests) => {
      res.status(200).json(guests);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints a guest by id.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFind(req, res, next) {
  find(req.params.guestId)
    .then((guest) => {
      res.status(200).json(guest);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the created guest.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printCreate(req, res, next) {
  // Create the guest.
  create(
    req.body.firstName,
    req.body.lastName,
    req.body.accessibility
  )
    // Find the guest.
    .then((guest) => find(guest.id)
      .then((foundGuest) => {
        res.status(201).json(foundGuest);
      }))
    // Errors.
    .catch(next);
}

/**
 * Prints the updated guest.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printUpdate(req, res, next) {
  // Update the guest.
  update(
    req.params.guestId,
    req.body.firstName,
    req.body.lastName,
    req.body.accessibility
  )
    .then((result) => {
      const updatedRows = result[0];
      if (updatedRows > 0) {
        // Find the guest.
        return find(req.params.guestId)
          .then((guest) => {
            res.status(200).json(guest);
          });
      }
      // Guest not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the destroyed guest.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printDestroy(req, res, next) {
  // Find the guest.
  find(req.params.guestId)
    .then((guest) => {
      if (guest) {
        // Destroy the guest.
        return destroy(req.params.guestId)
          .then(() => {
            res.status(200).json(guest);
          });
      }
      // Guest not found.
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
