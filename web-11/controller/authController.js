const userDB = {
  users: require("../models/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const fsPromises = require("fs/promises");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: "Username and password required" });
  const foundUser = userDB.users.find((person) => person.username === user);

  if (!foundUser)
    return res.sendStatus(401).json({ message: "Username does not exist" });

  // EVALUATE PASSWORD
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //CREATE JWTS => JSON WEB TOKEN

    const accessToken = jwt.sign(
      { "username": foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // SAVING THE REFRESHED TOKEN WITH CURRENT USERS
    const otherUsers = userDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUser([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(userDB.users)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } else {
    return res.status(401).json({ message: "Password mismatch" });
  }
};

module.exports = handleLogin;
