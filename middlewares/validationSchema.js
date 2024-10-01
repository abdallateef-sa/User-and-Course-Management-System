
const {body} = require('express-validator')

const validationSchema = ()=>{
 return [
  body('title').notEmpty().withMessage('Please provide title'),
  body('price').isNumeric().withMessage('Please provide price as a number')
]
  
}

module.exports = validationSchema;