import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // Less hackers know about your stack

const port = 8080;

/* HTTP GET Request */
app.get("/", (req, res) => {
  res.send("Hello World! / Home GET Request");
});

/* Start Server Only When We Have Valid Connection */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection");
  });
