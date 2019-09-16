const { Account, StripeCustomer } = require('../models'),
  jwt = require('jsonwebtoken');

// Does user have token?
exports.isAuthenticated = (request, response, next) => {
  let token = getToken(request);
  if (!token) {
    console.log('No token found');
    return response.status(403).json({ error: 'Unauthorized' })
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (decoded && decoded.id === request.params.userId) {
      request.user = decoded
      return next();
    } else if (error) {
      return response.status(403).json({ error: 'Unauthorized' })
    } else {
      return response.status(403).json({ error: 'Unauthorized' })
    }
  })
}

// Are they authorized to read/edit user data?
exports.isAuthorized = (request, response, next) => {
  return (request.user.id == request.params.userId) 
  ? next() 
  : response.status(403).json({ error: 'Unauthorized' })
}

// Are they able to pay $ ??
exports.canAddSchool = (request, response, next) => {
  let account = request.user.id;

  StripeCustomer.findOne(account)
  .then(customer => {
    if (!customer) {
      return response.status(403).json({ error: 'Unauthorized' })
    } else {
      return next()
    }
  })
  .catch(error => {
    console.log(error);
    return response.status(403).json({ error: 'Unauthorized' })
  })
}

// Are they authorized to Edit school data?
exports.canEditSchool = (request, response, next) => {
  let schoolId = request.params.schoolId
  let userId = request.user.id
  Account.findById(userId)
  .then((account) => {
    let schoolRole = account.roles.find(role => role.school == schoolId)

    if (!schoolRole) {
      return response.status(403).json({ error: 'Unauthorized' })
    } else {              
      return canEdit(schoolRole.role)
      ? next()
      : response.status(403).json({ error: 'Unauthorized' })
    }
  })
  .catch(error => {
    response.status(500).json(error)
  })
}

// Are they authorized to Read school data
exports.canReadSchool = (request, response, next) => {
  let schoolId = request.params.schoolId;
  let userId = request.userId.id;
  Account.findById(userId)
  .then((account) => {
    let schoolRole = account.roles.find(role => role.school == schoolId)

    if (!schoolRole) {
      return response.status(403).json({ error: 'Unauthorized' })
    } else {              
      return canRead(schoolRole.role)
      ? next()
      : response.status(403).json({ error: 'Unauthorized' })
    }
  })
  .catch(error => {
    response.status(500).json(error)
  })
}

const canRead = (role) => {
  return role == 'SUBSCRIBER' || role == 'EDITOR' || role == 'ADMIN'
}

const canEdit = (role) => {
  return role == 'EDITOR' || role == 'ADMIN'
}

const getToken = (request) => {  
  let authorization = request.headers.authorization;
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split('Bearer ')[1];
  }
}