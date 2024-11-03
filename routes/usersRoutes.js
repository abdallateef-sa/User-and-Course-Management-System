const express = require("express");

const router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {    
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'User'+ '-' + uniqueSuffix+`.${ext}`);
  }
})

function fileFilter (req, file, cb) {
  const ext = file.mimetype.split('/')[0];

  if (ext === 'image') {
    return cb(null, true);
  }else{
    return cb(appError.creat("only images are allowed", 400), false);
  }

}

const upload = multer({ storage: storage , fileFilter})

const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/verifyToken");
const appError = require("../utils/appError");

router.route("/")
  .get(verifyToken,usersController.getAllUsers);

router.route("/register")
  .post(upload.single('avatar'),usersController.register);

router.route("/login")
  .post(usersController.login);

router.route("/:userId")
  .get(usersController.getUser)
  .delete(verifyToken,usersController.deleteUser)
  .patch(verifyToken,usersController.updateUser);

module.exports = router;
