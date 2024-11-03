const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const coursesController = require("../controllers/courseController");

const { CoursesValidationSchema } = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middlewares/allowedTo"); 

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(verifyToken,CoursesValidationSchema(), coursesController.createCourse);

router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch(verifyToken,allowedTo(userRoles.MANAGER , userRoles.ADMIN),coursesController.updateCourse)
  .delete(verifyToken,allowedTo(userRoles.MANAGER , userRoles.ADMIN),coursesController.deleteCourse);

module.exports = router;
