const validator = require('validator');
const isEmpty = require('is-empty');

const validateRegisterInput = (data) => {
  let errors = {};
  data.password = !isEmpty(data.password) ? data.password : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  console.log('data', data);
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.email = 'Should be a email field';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
