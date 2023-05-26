const userDB = {
    users: require('../models/users.json'),
    setUser: function (data) {
        this.users = data;

    },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
    const  { user, pwd } =req.body;
    if (!user || !pwd)
    return res.status(400).json({ message: "Username and password required"});
    const foundUser = userDB.users.find(person => person.username === user);
    if(!foundUser)
    return res.status(401).json({ message: "User not found"})

    // Evaluate password//
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (!match)
    return res.status(200).json({ message: `User ${user} has login successfully`});
    else return res.status(401).json({ message: "Password mismatch"});
};

module.exports = handleLogin;