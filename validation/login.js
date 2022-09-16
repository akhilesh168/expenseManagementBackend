const validator = require('validator');
const isEmpty = require('is-empty');

const validateLoginInput = (data) => {
  let errors = {};
  data.password = !isEmpty(data.password) ? data.password : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Not a valid email field';
  }
  if (validator.isEmpty(data.password)) {
    errors.email = 'Name field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLoginInput;
