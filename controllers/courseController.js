const Course = require("../models/course.model");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");

//get all courses
const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);

  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
});

//get single course
const getCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    const error = appError.creat("course not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

//create course
const createCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = appError.creat(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const newCourse = new Course(req.body);

  await newCourse.save();

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { coures: newCourse } }); // 201 ==> created successfully
});

//update course
const updateCourse = asyncWrapper(async (req, res) => {
  const courseId = req.params.courseId;

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { $set: { ...req.body } },
    { new: true, runValidators: true } // new: true يجعل `updatedCourse` يحتوي على البيانات بعد التحديث
  );

  if (!updatedCourse) {
    return res.status(404).json({
      status: httpStatusText.FAIL,
      message: "Course not found",
    });
  }

  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { course: updatedCourse } });
});

//delete course
const deleteCourse = asyncWrapper(async (req, res) => {
  const deletedCourse = await Course.findByIdAndDelete({ _id: req.params.courseId });

  if (!deletedCourse) {
    return res.status(404).json({
      status: httpStatusText.FAIL,
      message: "Course not found",
    });
   }

  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
