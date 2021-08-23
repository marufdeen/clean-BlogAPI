const Joi = require("joi");
const validatePost = (postData) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    contentImage: Joi.string(),
  });

  return schema.validate(postData);
}; 

module.exports = validatePost;
