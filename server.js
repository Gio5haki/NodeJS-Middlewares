const express = require("express");
const app = express();
const bodyParser = require("body-parser");
port = 3000;
const pool = require("./connector");

app.use(bodyParser.urlencoded());

/*const secure = (request, response) => {
  const token = request.params.token;
  console.log(token);
  if (token || token !== null) {
    response.send("Hello World");
  } else {
    response.sendStatus(403);
  }
};*/

//Create user
app.post("/user", (req, res) => {
  const { first_name, last_name, token_id } = req.body;
  console.log(req.body);

  pool
    .query(
      "INSERT INTO users(first_name, last_name, token_id) VALUES($1, $2, $3);",
      [first_name, last_name, token_id]
    )
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(err => console.log(err));
});

//Create token
app.post("/token", (req, res) => {
  const { token } = req.body;

  pool
    .query("INSERT INTO tokens(token) VALUES($1);", [token])
    .then((data) => res.status(201).json(data))
    .catch((err) => sendStatus(404));
});

//GET users
app.get("/users", (req, res) => {
  pool
    .query("SELECT * FROM users;")
    .then((data) => res.json(data))
    .catch((err) => sendStatus(404));
});

//GET tokens
app.get("/tokens", (req, res) => {
  pool
    .query("SELECT * FROM tokens;")
    .then((data) => res.json(data))
    .catch((err) => sendStatus(404));
});

//app.get("/:token", secure);
//app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log("server is working"));
