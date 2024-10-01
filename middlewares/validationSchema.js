const {body} = require('express-validator')

//validationSchema
const CoursesValidationSchema = ()=>{
 return [
  body('title').notEmpty().withMessage('Please provide title'),
  body('price').isNumeric().withMessage('Please provide price as a number'),
]
  
}

const usersValidationSchema = ()=>{
  return [
   body('name').notEmpty().withMessage('Please provide name'),
   body('age').isNumeric().withMessage('Please provide age as a number'),
   body('age').isInt({max: 100}).withMessage('Please provide age less than 100'),
 ]
   
 }

module.exports = {CoursesValidationSchema , usersValidationSchema};