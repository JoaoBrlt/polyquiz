const ApplicationError = require('./application-error');

class AlreadyExistsError extends ApplicationError {
  constructor() {
    super(403, 'The resource already exists.');
  }
}

module.exports = AlreadyExistsError;
