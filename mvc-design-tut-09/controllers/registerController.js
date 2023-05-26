const data = {
    users: require("../models/users.json"),
    setUser: function (data) {
        this.users = data;
    },
};

const fsPromise = require("fs/Promise");
const path = require("path");
const bcrypt = require("bcrypt");