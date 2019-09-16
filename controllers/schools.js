const { School } = require('../models');

exports.getAllSchools = (request, response) => {
  School.find()
  .then(schools => {
    response.status(200).json(schools)
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}

exports.postNewSchool = (request, response) => {
  let owner = request.user.id
  const { name, city, state } = request.body;
  let school = new School({
    name,
    city,
    state,
    owner
  })

  school.save()
  .then(school => {
    response.status(201).json(school)
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}

exports.getSchoolById = (request, response) => {
  School.findById(request.params.schoolId)
  .then(school => {
    response.status(200).json(school)
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error)
  })
}

exports.putSchoolById = (request, response) => {
  
}

module.exports = exports