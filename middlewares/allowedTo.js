const appError = require("../utils/appError");


module.exports = (...roles)=>{
  
  return (req, res, next) => {

    if(!roles.includes(req.currentUser.role)){
      console.log(req.currentUser.role);
      const error = appError.creat("you are not allowed to perform this action", 403);
      return next(error);
    }

    next();
  }
}