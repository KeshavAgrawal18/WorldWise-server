import bcrypt from "bcrypt";
import { randomStringGenerator } from "../utils/randomGenerators.js";
import User from "../Models/UserModel.js";
const saltRounds = 12;

const createNewUser = (req, res) => {
  let id = randomStringGenerator(12);
  const { email, username, password } = req.body;
  console.log(req.body);
  console.log(password);
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        console.log(err);
        res.status(400).send("Internal sever error.");
      } else {
        const user = new User({
          email,
          username,
          userId: id,
          password: hash,
        });
        console.log(user);
        user.save();
        res.send({ username, userId: user.id });
      }
    });
  });
};

const getUserLogin = (req, res) => {
  const { username, password } = req.body;

  User.find({ username: username }).then((user) => {
    const hash = user[0].password;

    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        res.status(400).send("Internal server error.");
      } else {
        if (result === false) {
          res.status(401).send("Unauthorized response");
        } else {
          console.log("login verified");
          res.send({
            username: user[0].username,
            userId: user[0].userId,
          });
        }
      }
    });
  });
};

export { createNewUser, getUserLogin };
