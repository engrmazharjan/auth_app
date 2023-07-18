import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// * Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // Less hackers know about your stack

const port = 8080;

// * HTTP GET Request
app.get("/", (req, res) => {
  res.send("Hello World! / Home GET Request");
});

// * Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
