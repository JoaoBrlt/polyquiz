const models = require('../models');
const NotFoundError = require('../utils/errors/not-found-error');

/* -------------------------------------------------------------------------- */
/*                              GETTERS / SETTERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Finds all the themes.
 */
function findAll() {
  return models.Theme
    .findAll({
      // Order the themes.
      order: [['id', 'ASC']]
    });
}

/**
 * Finds a theme by id.
 * @param id The id of the theme.
 */
function find(id) {
  return models.Theme.findByPk(id);
}

/**
 * Creates a theme.
 * @param name The name of the theme.
 * @param imageId The id of the image.
 */
function create(name, imageId) {
  return models.Theme
    .create({
      name,
      imageId
    });
}

/**
 * Updates a theme by id.
 * @param id The id of the theme.
 * @param name The name of the theme.
 * @param imageId The id of the image.
 */
function update(id, name, imageId) {
  return models.Theme
    .update(
      {
        name,
        imageId
      },
      {
        where: { id }
      }
    );
}

/**
 * Destroys a theme by id.
 * @param id The id of the theme.
 */
function destroy(id) {
  return models.Theme
    .destroy({
      where: { id }
    });
}

/* -------------------------------------------------------------------------- */
/*                                    PRINTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Prints all the themes.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFindAll(req, res, next) {
  findAll()
    .then((themes) => {
      res.status(200).json(themes);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints a theme by id.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFind(req, res, next) {
  find(req.params.themeId)
    .then((theme) => {
      if (theme) {
        res.status(200).json(theme);
      } else {
        // Theme not found.
        next(new NotFoundError());
      }
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the created theme.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printCreate(req, res, next) {
  // Create the theme.
  create(req.body.name, req.body.imageId)
    // eslint-disable-next-line arrow-body-style
    .then((theme) => {
      // Find the theme.
      return find(theme.id)
        .then((foundTheme) => {
          res.status(201).json(foundTheme);
        });
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the updated theme.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printUpdate(req, res, next) {
  // Update the theme.
  update(req.params.themeId, req.body.name, req.body.imageId)
    .then((result) => {
      const updatedRows = result[0];
      if (updatedRows > 0) {
        // Find the theme.
        return find(req.params.themeId)
          .then((theme) => {
            res.status(200).json(theme);
          });
      }
      // Theme not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the destroyed theme.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printDestroy(req, res, next) {
  // Find the theme.
  find(req.params.themeId)
    .then((theme) => {
      if (theme) {
        // Destroy the theme.
        return destroy(req.params.themeId)
          .then(() => {
            res.status(200).json(theme);
          });
      }
      // Theme not found.
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
