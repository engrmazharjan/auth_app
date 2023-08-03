import toast from "react-hot-toast";
import { authenticate } from "./helper";

// * Validate Login Page Username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
  if (values.username) {
    // check user existence
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("User does not exist");
    }
  }

  return errors;
}

// * Validate Password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

// * Validate Reset Password
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password Do Not Match!");
  }

  return errors;
}

// * Validate Register Form
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  return errors;
}

// * Validate Profile Page
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

// **************************************************

// * Validate Password
function passwordVerify(errors = {}, values) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password Required!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password!");
  } else if (values.password.length < 8) {
    errors.password = toast.error(
      "Password Must Be 8 or More Than 8 Characters Long"
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password Must Have Special Character");
  }

  return errors;
}

// * Validate Username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Is Required!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username!");
  } else if (values.username.length < 8) {
    error.username = toast.error("Username Cannot Be Less Than 8 Characters");
  }
  return error;
}

// * Validate Email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid Email Address!");
  }

  return error;
}
