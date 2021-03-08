// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ error })
    .end();
};

module.exports = errorHandler;
