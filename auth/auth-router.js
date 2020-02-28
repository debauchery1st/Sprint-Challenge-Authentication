const router = require("express").Router();
const api = require("../api/api-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../server/secrets");

router.get("/", (req, res) => {
  res.status(200).send("Sprint Challenge: Authentication - Dad Jokes");
});

router.post(
  "/register",
  (req, res) =>
    (req.body.username &&
      req.body.password &&
      api
        .add({
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, 13)
        })
        .then(newUser =>
          api.findById(newUser[0]).then(nu => res.status(201).json(nu))
        )
        .catch(({ name, message, stack }) =>
          res.status(500).json({ name, message, stack })
        )) ||
    res.status(400).json({ message: "username and password required." })
);

router.post(
  "/login",
  (req, res) =>
    (req.body.username &&
      req.body.password &&
      api
        .findBy({ username: req.body.username })
        .first()
        .then(user =>
          user && bcrypt.compareSync(req.body.password, user.password)
            ? res.status(200).json({
                message: `Welcome ${user.username}`,
                token: generateToken(user)
              })
            : res.status(418).json({
                message: "I'm a little teapot"
              })
        )
        .catch(({ name, code, message, stack }) =>
          res.status(500).json({ name, code, message, stack })
        )) ||
    res.status(400).json({ message: "username and password required." })
);

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
