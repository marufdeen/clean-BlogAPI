const { object } = require('joi');
const validate  = require('../helpers/postValidations') ;

 const validatePost = async (req, res, next) => {
  const errors = await validate(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(401).json({
      errors
    });
  }
  return next();
};
 
 module.exports =  validatePost;
