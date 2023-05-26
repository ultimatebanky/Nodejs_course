const express = require ("express");
const router = express.Router();
const path = require("path");
const studentsController = require('../../controllers/studentsController')


data = {};
data.students = require("../../models/students.json");

router.route("/")
.get(studentsController.getAllStudents)
.post(studentsController.createNewStudent)
.put(studentsController.updateStudent)
.delete(studentsController.deleteStudent);

router.route("/:id").get(studentsController.getStudent);

module.exports = router;
