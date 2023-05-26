const userDB = {
    users: require("../models/users.json"),
    setUser: function (data) {
        this.users = data;
    },
};

const fsPromise = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const {user, pwd} =req.body;
    if (!user || !pwd) return res.status(400).json({ message: "Username and password required" });

    // check for duplicate
    const duplicate = userDB.users.find((person) => person.username === user);
    if (duplicate) return res.status(409).json({message: `User ${user} has already registered`}) // conflict
    
    try {
        const hashpwd = await bcrypt.hash(pwd, 10)
        const newUser = {"username": user, password: hashpwd };
        userDB.setUser([...userDB.users, newUser]);
         
        fsPromise.writeFile(
        path.join(__dirname, "..", "models", "users.json"), 
        JSON.stringify(userDB.users)
        );
        
    console.log(newUser);
    res.status(201).json({ message: `user ${newUser.username} has registered sucessfully`,});

    } catch (error) {
        res.status(500).json ({ message: error.message});
    }
};

module.exports = handleNewUser