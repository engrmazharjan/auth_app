import toast from "react-hot-toast";

// * Validate Login Page Username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
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
