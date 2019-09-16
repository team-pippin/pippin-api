const isEmpty = (string) => {
  if (string.trim() === '') {
    return true
  } else {
    return false
  }
}
  
const isEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) {
    return true
  } else {
    return false
  }
}

exports.validateSignUpData = (data) => {
  let errors = {};

  if (data.email === null || isEmpty(data.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (data.password === null || isEmpty(data.password)) { 
    errors.password = 'Must not be empty';
  } else if (data.password.length < 6) {
    errors.password = 'Must be more than 6 characters';
  }
  
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}

exports.validateSignInData = (data) => {
  let errors = {};

  if (data.email === null || isEmpty(data.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address';
  }
  
  if (data.password === null || isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
}
