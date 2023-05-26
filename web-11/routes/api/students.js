const express = require('express');
const router = express.Router()
const studentController = require('../../controller/studentsController')

router.route('/')
// To Read
.get( studentController.getAllStudents)

// To create
.post(studentController.createNewStudents)

// To Update
.put(studentController.updateStudents)

// To delete

.delete(studentController.deleteStudents)

router.route('/:id')
.get(studentController.getStudents)

module.exports = router;