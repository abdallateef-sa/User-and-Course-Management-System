const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const usersController = require('../controllers/usersController');
const {usersValidationSchema} = require('../middlewares/validationSchema')



router.route('/')
  .get(usersController.getAllUsers)
  .post(
    usersValidationSchema(),
    usersController.createUser
  );


router.route('/:userId')
  .get(usersController.getUser)
  .delete(usersController.deleteUser)
  .patch(usersController.updateUser);







module.exports = router;