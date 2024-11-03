const {body} = require('express-validator')

//validationSchema
const CoursesValidationSchema = ()=>{
 return [
  body('title').notEmpty().withMessage('Please provide title'),
  body('price').isNumeric().withMessage('Please provide price as a number'),
]
  
}


module.exports = {CoursesValidationSchema };