let {courses} = require("../Data/Courses.js");
const {validationResult } = require("express-validator");


const getAllCourses = (req, res) => {
  res.json(courses);
}

const getCourse = (req, res) => {
  const courseID = +req.params.courseId;

  const course = courses.find((c) => c.id === courseID);

  if (!course) {
    return res.status(404).json({ msg: "Course not found" });
  }

  res.json(course);
}

const createCourse = (req, res) => {
  //console.log(req.body);

  const errors = validationResult(req);
  //console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  // if (!req.body.title) {
  //   return res.status(400).json({ msg: "Please provide title" }); // 400 ==> bad request
  // }

  // if (!req.body.price) {
  //   return res.status(400).json({ msg: "Please provide price" }); // 400 ==> bad request
  // }

  const course = { id: courses.length + 1, ...req.body };
  courses.push(course);

  res.status(201).json(course); // 201 ==> created successfully
}

const updateCourse = (req, res) => {
  const courseId = +req.params.courseId;
  let course = courses.find((course) => course.id === courseId);

  if (!course) {
    return res.status(404).json({ msg: "Course not found" });
  }

  course = { ...course, ...req.body };
  res.status(200).json(course);
}

const deleteCourse = (req, res) => {
  const courseId = +req.params.courseId;
  courses = courses.filter((course) => course.id !== courseId);

  res.status(200).json({ success: true });
}


module.exports ={
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
}