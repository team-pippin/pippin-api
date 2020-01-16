const { Account } = require("../models"),
  jwt = require("jsonwebtoken");

exports.getUser = (request, response) => {
  let userId = request.user.id;
  Account.findById(userId)
    .then(user => {
      response.status(200).json(user);
    })
    .catch(error => {
      response.status(500).json(error);
    });
};

exports.deleteUserAccount = (request, response) => {};

exports.signUp = (request, response) => {
  createUser(request, response);
};

exports.signIn = (request, response) => {
  Account.findOne({ email: request.body.email })
    .exec()
    .then(user => {
      if (user !== null) {
        signIn(user, request, response);
      } else {
        response.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

exports.subscribe = (request, response) => {
  let schoolId = request.body.school;

  Account.findById(request.params.userId)
    .then(user => {
      user.roles = [...user.roles, { school: schoolId, role: "SUBSCRIBER" }];
      return user.save();
    })
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

exports.unSubscribe = (request, response) => {
  let schoolId = request.params.schoolId;

  Account.findById(request.params.userId)
    .then(user => {
      console.log(schoolId);
      console.log(user.roles);

      user.roles = user.roles.filter(
        schoolRole => schoolRole.school != schoolId
      );
      console.log(user.roles);

      return user.save();
    })
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
};

const createUser = (request, response) => {
  let token;
  let user = new Account({
    email: request.body.email,
    name: request.body.name,
    password: request.body.password,
    roles: request.body.roles,
    createdDate: new Date().toISOString()
  });

  console.log(user);

  user
    .save()
    .then(newUser => {
      const { id } = newUser;
      token = jwt.sign({ id }, process.env.SECRET_KEY);
      response.status(201).json({ user: newUser, token });
    })
    .catch(error => {
      console.log(error);

      response.status(500).json(error.localizedMessage);
    });
};

const signIn = (user, request, response) => {
  user
    .comparePassword(request.body.password)
    .then(isMatch => {
      if (isMatch) {
        const { id } = user;
        let token = jwt.sign({ id }, process.env.SECRET_KEY);
        response.status(200).json({ user: user, token });
      } else {
        response.status(403).json({ message: "Unauthorized" });
      }
    })
    .catch(error => {
      response.status(500).json(error);
    });
};

module.exports = exports;
