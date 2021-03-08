const ApplicationError = require('./application-error');

class LimitReachedError extends ApplicationError {
  constructor() {
    super(403, 'The resource limit has been reached.');
  }
}

module.exports = LimitReachedError;
