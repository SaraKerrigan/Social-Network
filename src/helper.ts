import * as Yup from "yup";

const regx = {
  name: /^[A-z]{2,20}/,
};
const username = Yup.string()
  .matches(regx.name, "только латиница от 2 до 20 символов")
  .required("поле обязательно для ввода");

const password = Yup.string()
  .min(8, "не менее 8 символов")
  .required("пароль обязателен");

export const schemas = {
  custom: Yup.object().shape({ username, password }),
};

export const initialValues = {
  username: "",
  password: "",
};
