import toast from "react-hot-toast";

// * Validate Login Page Username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);
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
