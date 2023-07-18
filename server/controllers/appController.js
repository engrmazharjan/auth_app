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
  res.json("Register Route");
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
