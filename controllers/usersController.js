const user = require("../models/users.model");
const asyncWrapper = require("../middlewares/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require("../utils/generateJWT"); 
const userRoles = require("../utils/userRoles"); 


//get all users
const getAllUsers = asyncWrapper ( async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  

  const Users = await user.find({}, { __v: false  , 'password' : false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { Users }});
});


//register
const register = asyncWrapper(async (req, res , next) => {
  const { firstName, lastName, email, password , role } = req.body;

  const oldUser =  await user.findOne({email : email});

  if (oldUser) {
    const error = appError.creat("user already exists", 400, httpStatusText.FAIL);
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10 );

  const newUser = new user({ 
    firstName, 
    lastName, 
    email,
    password : hashedPassword,
    role,
    avatar : req.file.filename
  });
  
    //generate token
    const token = await generateJWT({email : newUser.email , id : newUser._id , role : newUser.role });
    newUser.token = token; 
    
    await newUser.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } });

})

//login
const login = asyncWrapper(async(req,res, next) => {
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    const error = appError.creat("please provide email and password", 400, httpStatusText.FAIL);
    return next(error);
  }

  const foundUser = await user.findOne({email: email});
  
  if(!foundUser){
    const error = appError.creat("user not found", 404, httpStatusText.FAIL);
    return next(error); 
  }


  const matchedPassword = await bcrypt.compare(password, foundUser.password); 

  if(foundUser && matchedPassword){
    // login success
    const token = await generateJWT({email : foundUser.email , id : foundUser._id , role : foundUser.role});

    return res.status(200).json({ status: httpStatusText.SUCCESS, data:{ token }});
  }
  else{
    const error = appError.creat("email or password is incorrect", 404, httpStatusText.FAIL);
    return next(error);
  }
  


})


// get single user
const getUser = asyncWrapper( async (req, res ) => {
  const User = await user.findById(req.params.userId);
  if (!user) {
    const error = appError.creat("user not found", 404, httpStatusText.FAIL);
   return next(error);
  }

  return res.json({ status: httpStatusText.SUCCESS, data: { User } } );

});

// remove 
const deleteUser = async(req, res) => {
  await user.deleteOne({ _id: req.params.userId });
  res.status(200).json({ success: true });
};

// edit
const updateUser = async (req, res , next) => {
  const userID = req.params.userId;
  try{
    const updatedUser =  await user.updateOne({_id: userID} ,{$set : {...req.body}})
    if (!user) {
      const error = appError.creat("user not found", 404, httpStatusText.FAIL);
      return next(error);
    }
     return res.status(200).json(updatedUser);
  }
  catch (error){
    return res.status(400).json({error});
  }

};


module.exports = {
  getAllUsers,
  register,
  login,
  getUser,
  deleteUser,
  updateUser
};

