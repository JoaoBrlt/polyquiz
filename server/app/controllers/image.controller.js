const models = require('../models');
const NotFoundError = require('../utils/errors/not-found-error');

/* -------------------------------------------------------------------------- */
/*                              GETTERS / SETTERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Finds all the images.
 */
function findAll() {
  return models.Image
    .findAll({
      order: [['id', 'ASC']]
    });
}

/**
 * Finds an image by id.
 * @param id The id of the image.
 */
function find(id) {
  return models.Image.findByPk(id);
}

/**
 * Creates an image.
 * @param name The name of the image.
 * @param path The path of the image.
 */
function create(name, path) {
  return models.Image
    .create({
      name,
      path
    });
}

/**
 * Updates an image by id.
 * @param id The id of the image.
 * @param name The name of the image.
 * @param path The path of the image.
 */
function update(id, name, path) {
  return models.Image
    .update(
      {
        name,
        path
      },
      {
        where: { id }
      }
    );
}

/**
 * Destroys an image by id.
 * @param id The id of the image.
 */
function destroy(id) {
  return models.Image
    .destroy({
      where: { id }
    });
}

/* -------------------------------------------------------------------------- */
/*                                    PRINTS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Prints all the images.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFindAll(req, res, next) {
  findAll()
    .then((images) => {
      res.status(200).json(images);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints an image by id.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printFind(req, res, next) {
  find(req.params.imageId)
    .then((image) => {
      if (image) {
        res.status(200).json(image);
      } else {
        // Image not found.
        next(new NotFoundError());
      }
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the created image.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printCreate(req, res, next) {
  create(req.body.name, req.body.path)
    .then((image) => {
      res.status(201).json(image);
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the updated image.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printUpdate(req, res, next) {
  // Update the image.
  update(req.params.imageId, req.body.name, req.body.path)
    .then((result) => {
      const updatedRows = result[0];
      if (updatedRows > 0) {
        // Find the image.
        return find(req.params.imageId)
          .then((image) => {
            res.status(200).json(image);
          });
      }
      // Image not found.
      throw new NotFoundError();
    })
    // Errors.
    .catch(next);
}

/**
 * Prints the destroyed image.
 * @param req The request object.
 * @param res The response object.
 * @param next The callback for the next middleware.
 */
function printDestroy(req, res, next) {
  // Find the image.
  find(req.params.imageId)
    .then((image) => {
      if (image) {
        // Destroy the image.
        return destroy(req.params.imageId)
          .then(() => {
            res.status(200).json(image);
          });
      }
      // Image not found.
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
