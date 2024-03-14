import bcrypt from "bcrypt";
import { randomStringGenerator } from "../utils/randomGenerators.js";
import User from "../Models/UserModel.js";
const saltRounds = 12;

const createNewUser = (req, res) => {
  let id = randomStringGenerator(12);
  const { email, username, password } = req.body;

  User.exists({ email })
    .then((emailExists) => {
      if (emailExists) {
        return res.status(409).send({
          message: "User with this email already exists",
          emailExists: true,
        });
      } else {
        User.exists({ username })
          .then((usernameExists) => {
            if (usernameExists) {
              return res.status(409).send({
                message: "User with this username already exists",
                emailExists: true,
              });
            } else {
              bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                  console.log(err);
                  return res.status(400).send("Internal server error.");
                }

                bcrypt.hash(password, salt, function (err, hash) {
                  if (err) {
                    console.log(err);
                    return res.status(400).send("Internal server error.");
                  }

                  const user = new User({
                    email,
                    username,
                    userId: id,
                    password: hash,
                  });

                  console.log(user);
                  user
                    .save()
                    .then(() => {
                      return res.send({ username, userId: user.id });
                    })
                    .catch((err) => {
                      console.log(err);
                      return res.status(500).send("Internal server error");
                    });
                });
              });
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send("Internal server error");
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Internal server error");
    });
};

const getUserLogin = (req, res) => {
  const { username, password } = req.body;
  User.find({ username: username }).then((user) => {
    if (user.length == 0) {
      res.status(404).send();
    } else {
      const hash = user[0].password;
      // console.log(hash);

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
    }
  });
};

export { createNewUser, getUserLogin };
