import joi from "joi";

export const UsersSchemaValidate = joi.object({
  username: joi.string().required(),
  avatar:joi.string().required(),
  password: joi.string().required().min(5).max(20),
  confirmPassword: joi.string().required().min(5).max(20),
  email: joi
    .string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "yahoo"] } }),
});

export const MoviesSchemaValidate = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  titleImage: joi.string().required(),
  image: joi.string().required(),
  category: joi.string().required(),
  language: joi.string().required(),
  year: joi.number().required().min(1990).max(2023),
  time: joi.number().min(0).required().min(0),
  video: joi.string().required(),
  rate: joi.number().min(0).max(5).required(),
});

export const CategoriesSchemaValidate = joi.object({
  title: joi.string().required(),
  slug:joi.string()
});
