const { Account } = require("../models"),
  jwt = require("jsonwebtoken");

exports.getUser = (request, response) => {
  // Already have account from Encoded token request.
  response.status(200).json(request.user);
};

exports.deleteUserAccount = (request, response) => {};

exports.signUp = (request, response) => {
  createUser(request, response);
};

exports.signIn = async (request, response) => {
  try {
    const user = await Account.findOne({ email: request.body.email }).exec();
    if (user !== null) {
      await signIn(user, request, response);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

exports.subscribe = async (request, response) => {
  let schoolId = request.body.school;
  let user = request.user;

  try {
    user.roles = [...user.roles, { school: schoolId, role: "SUBSCRIBER" }];
    const result = await user.save();
    response.status(201).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

exports.unSubscribe = async (request, response) => {
  let schoolId = request.params.schoolId;
  let user = request.user;

  try {
    user.roles = user.roles.filter(schoolRole => schoolRole.school != schoolId);
    const result = await user.save();
    response.status(201).json(result);
  } catch (error) {
    response.status(500).json(error);
  }
};

const createUser = async (request, response) => {
  let user = new Account({
    email: request.body.email,
    name: request.body.name,
    password: request.body.password,
    roles: request.body.roles,
    createdDate: new Date().toISOString()
  });

  console.log(user);

  try {
    const newUser = await user.save();
    const { id } = newUser;
    let token = jwt.sign({ id }, process.env.SECRET_KEY);
    response.status(201).json({ user: newUser, token });
  } catch (error) {
    console.log(error);
    response.status(500).json(error.localizedMessage);
  }
};

const signIn = async (user, request, response) => {
  try {
    let isMatch = await user.comparePassword(request.body.password);
    if (isMatch) {
      const { id } = user;
      let token = jwt.sign({ id }, process.env.SECRET_KEY);
      response.status(200).json({ user, token });
    } else {
      response.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
};

module.exports = exports;
