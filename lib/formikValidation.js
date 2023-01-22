// get all the values of your input text in values
export default function login_validate(values) {
  const errors = {};

  // VALIDATION FOR EMAIL
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // VALIDATION FOR PASSWORD
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 30) {
    errors.password = "Must be greater than 8 chars or less than 30";
  } else if (values.password.includes(" ")) {
    errors.password = "Password cannot include an empty space";
  }

  return errors;
}

// get all that values of your input box's by:
export function registerValidate(values) {
  const errors = {};

  //  VALIDATION FOR USERNAME
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid Username...";
  }

  // VALIDATION FOR PASSWORD
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 30) {
    errors.password = "Must be greater than 8 chars or less than 30";
  } else if (values.password.includes(" ")) {
    errors.password = "Password cannot include an empty spaces";
  }

  // VALIDATION FOR CONFIRM PASSWORD
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Passwords don't match";
  }

  return errors;
}
