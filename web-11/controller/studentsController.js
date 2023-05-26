const data = {
  students: require("../models/students.json"),
  setStudents:function (data)  {
    this.students = data;
  },
};

const getAllStudents = (req, res) => {
  res.json(data.students);
};

// POST NEW STUDENTS
const createNewStudents = (req, res) => {
  const newStudent = {
    id: data.students[data.students.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  // SET THE REQUIRED CONDITION FOR THE TWO PARAMETERS
  if (!newStudent.firstname || !newStudent.lastname) {
    return res
      .status(400)
      .json({ message: "First name and last name are required" });
  }

  // ADD THE NEW STUDENTS TO THE STUDENTS LIST
  data.setStudents([...data.students, newStudent]);

  res.status(201).json(data.students);
};

// UPDATING NEW STUDENTS 
const updateStudents = (req, res) => {
  const student = data.students.find((std) => std.id === parseInt(req.body.id));

  if (!student) {
    return res
      .status(400)
      .json({ message: `student Id ${req.body.id} not found` });
  }

  if (req.body.firstname) student.firstname = req.body.firstname; // if we found an id
  if (req.body.firstname) student.lastname = req.body.lastname;

  const filteredStudentArr = data.students.filter(
    (std) => std.id !== parseInt(req.body.id)
  );

  const unsortedStudentArr = [...filteredStudentArr, student];

  data.setStudents(
    unsortedStudentArr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );

  res.json(data.students);
};

// DELETING NEW STUDENTS
const deleteStudents = (req, res) => {
    const student = data.students.find(
        (std) => std.id === parseInt(req.body.id)
      );
      if (!student) {
        return res
          .status(400)
          .json({ message: `Employee ID ${req.body.id} not found` });
      }
      const filteredStudentArr = data.students.filter(
        (std) => std.id !== parseInt(req.body.id)
      );
      data.setStudents([...filteredStudentArr]);
      res.json(data.students);
};

// READING NEW STUDENTS
const getStudents = (req, res) => {
    const student = data.students.find(
        (std) => std.id === parseInt(req.params.id)
      );
      if (!student) {
        return res
          .status(400)
          .json({ message: `Employee ID ${req.params.id} not found` });
      }
      res.json(student);
};

module.exports = {
  getAllStudents,
  createNewStudents,
  updateStudents,
  deleteStudents,
  getStudents,
};
