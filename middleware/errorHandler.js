const {StatusCodes} = require('http-status-codes');
const availableCountries = require('../db/countries')

const errorHandlerMiddleware = (err, req, res, next) => {
let customError = {
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later...'
}

if(err.code === 11000){
    customError.msg = `Duplicate values entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    customError.statusCode = 400
}

if (err.name === "ValidationError"){
  customError.msg = Object.values(err.errors)
    .map((item) => item.message)
    .join(" ,");
  customError.statusCode = 400;
} 
if(err.name === 'CastError'){
  customError.msg = `No item found with id : ${err.value}`;
  customError.statusCode = 404;
}
// if (
//   err.errors &&
//   err.errors.countryOfOrigin &&
//   err.errors.countryOfOrigin.path === "countryOfOrigin"
// ) {
//   customError.msg = `make sure to Take one from the developed countries - ${availableCountries.join(
//     ", "
//   )}`;
// }
  return res
    .status(customError.statusCode)
    .json({ err: customError.msg, TypeOfError: err.name }); 
}

module.exports = errorHandlerMiddleware;