import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    console.log(username, password, profile, email);

    // Check the existing username
    const existingUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, (err, user) => {
        if (err) {
          reject(new Error(err));
        }
        if (user) {
          reject(
            new Error("Username Already Exists, Please Use Unique Username")
          );
        }
        resolve();
      });
    });

    // Check the existing email
    const existingEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, (err, email) => {
        if (err) {
          reject(new Error(err));
        }
        if (email) {
          reject(new Error("Email Already Exists, Please Use Another Email"));
        }
        resolve();
      });
    });

    // Use Promise.allSettled to handle multiple promises with better error handling
    await Promise.allSettled([existingUsername, existingEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              // Return save result as a response
              user
                .save()
                .then((result) => {
                  res.status(201).json({
                    user: result,
                    msg: "User Registered Successfully",
                  });
                })
                .catch((error) => {
                  return res.status(500).send({ error });
                });
            })
            .catch((error) => {
              return res
                .status(500)
                .send({ error: "Enable To Hashed Password" });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/** POST: http://localhost:8080/api/login 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
}
*/
export async function login(req, res) {
  res.json("Login Route");
}

/* GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  res.json("Get User Route");
}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
//   "header" : "<token>"
"id":"<userId>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
  res.json("Update User Route");
}

/* GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
  res.json("GenerateOTP Route");
}

/* GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  res.json("verifyOTP Route");
}

/* Successfully redirect user when OPT is valid */
/* GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  res.json("CreateResetSession Route");
}

/* Update the password when we have valid session */
/* PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  res.json("ResetPassword Route");
}
