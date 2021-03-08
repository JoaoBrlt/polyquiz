const { Router } = require('express');
const models = require('../../models');

const router = Router();

router.get('/', (req, res, next) => {
  // Check the database connection.
  models.sequelize
    .authenticate()
    .then(() => {
      res.status(200).json({ status: 'ok' });
    })
    // Errors.
    .catch(next);
});

module.exports = router;
