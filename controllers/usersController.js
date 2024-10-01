let users = require("../Data/Users");
const { validationResult } = require("express-validator");

const getAllUsers = (req, res) => {
  res.json(users);
};

// get single user
const getUser = (req, res) => {
  const userID = +req.params.userId;

  const user = users.find((c) => c.id === userID);

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }

  res.json(user);
};

// create
const createUser = (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const user = { id: users.length + 1, ...req.body };
  users.push(user);

  res.status(201).json(user);
};

// remove 
const deleteUser = (req, res) => {
  const userID = +req.params.userId;
  users = users.filter((user) => user.id !== userID);

  res.status(200).json({ success: true });
};

// edit
const updateUser = (req, res) => {
  const userID = +req.params.userId;
  let user = users.find((user) => user.id === userID);
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  user = { ...user, ...req.body };
  res.status(200).json(user);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
};
