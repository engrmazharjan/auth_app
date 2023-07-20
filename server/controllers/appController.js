import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import ENV from "../config.js";

/** Middleware for verify user */
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // Check the user existence
    let exist = await UserModel.findOne({ username });
    if (!exist) {
      return res.status(404).send({ error: "User Not Found" });
    }

    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

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
  const { username, password } = req.body;

  try {
    const user = UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).send({ error: "Don't Have Password" });
            }

            // Create JWT token
            const token = Jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "Login Successful",
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password Does Not Match" });
          });
      })
      .catch((error) => {
        return res.status(500).send({ error: "User Not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

/* GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(501).send({ error: "Invalid Username" });
    }

    const user = await UserModel.findOne({ username })
      .select("-password")
      .lean();

    // const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(501).send({ error: "User Not Found" });
    }

    /** Remove password from user */
    /** mongoose return unnecessary data with object so convert it into json */
    // const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(201).send(user);
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
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
  try {
    // const id = req.query.id;
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).send({ error: "User Not Found" });
    }

    const body = req.body;

    // Update the data using async/await
    const updatedUser = await UserModel.updateOne({ _id: userId }, body);

    if (updatedUser) {
      return res.status(201).send({ msg: "Record Updated" });
    } else {
      return res.status(404).send({ error: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
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
