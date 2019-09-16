const { Account } = require('../models'),
  jwt = require('jsonwebtoken');

/// Authorized to read and edit User data
exports.isAuthorized = (request, response, next) => {
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

exports.canEditSchool = (request, response, next) => {
  let token = getToken(request);

  if (!token) {
    console.log('No token found');
    return response.status(403).json({ error: 'Unauthorized' })
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    console.log(decoded);
    
    if (decoded && decoded.id) {
      request.user = decoded

      let schoolId = request.params.schoolId
      let userId = decoded.id
      Account.findById(userId)
      .then((account) => {
        let schoolRole = account.roles.find(role => role.school == schoolId)

        if (!schoolRole) {
          return response.status(403).json({ error: 'Unauthorized' })
        } else {              
          return schoolRole.role == 'EDITOR' || schoolRole.role == 'ADMIN' 
          ? next()
          : response.status(403).json({ error: 'Unauthorized' })
        }
      })
      .catch(error => {
        response.status(500).json(error)
      })
    } else if (error) {
      return response.status(403).json({ error: 'Unauthorized' })
    } else {
      return response.status(403).json({ error: 'Unauthorized' })
    }
  })
}

exports.canReadSchool = (request, response, next) => {
  let token = getToken(request);

  if (!token) {
    console.log('No token found');
    return response.status(403).json({ error: 'Unauthorized' })
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    console.log(decoded);
    
    if (decoded && decoded.id) {
      request.user = decoded

      let schoolId = request.params.schoolId
      let userId = decoded.id
      Account.findById(userId)
      .then((account) => {
        let schoolRole = account.roles.find(role => role.school == schoolId)

        if (!schoolRole) {
          return response.status(403).json({ error: 'Unauthorized' })
        } else {              
          return schoolRole.role == 'SUBSCRIBER' || schoolRole.role == 'EDITOR' || schoolRole.role == 'ADMIN' 
          ? next()
          : response.status(403).json({ error: 'Unauthorized' })
        }
      })
      .catch(error => {
        response.status(500).json(error)
      })
    } else if (error) {
      return response.status(403).json({ error: 'Unauthorized' })
    } else {
      return response.status(403).json({ error: 'Unauthorized' })
    }
  })
}

const getToken = (request) => {  
  let authorization = request.headers.authorization;
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split('Bearer ')[1];
  }
}