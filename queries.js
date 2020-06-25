const { response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'jtwidt',
  host: 'localhost',
  database: 'students',
  password: '1qaz2wsx#EDC$RFV',
  port: 5432,
});

const getStudents = (req, res) => {
  pool.query('SELECT * FROM students ORDER BY id ASC', (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.studentId);
  pool.query('SELECT * FROM students WHERE id= $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const getStudentByName = (req, res) => {
  const name = req.query.search;
  pool.query(
    'SELECT * FROM students WHERE name= $1',
    [name],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};

const getGradesById = (req, res) => {
  const id = parseInt(req.params.studentId);
  pool.query(
    'SELECT * FROM grades WHERE student_id = $1',
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rows);
    }
  );
};

//prettier-ignore
const addGrade = (req, res) => {
  const { grade, studentId } = req.body;
  pool.query(
    'INSERT INTO grades (grade, student_id) VALUES ($1, $2)', [grade, studentId],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Grade added for student id ${studentId}`);
    }
  );
};

const addStudent = (req, res) => {
  const { name } = req.body;
  pool.query(
    'INSERT INTO students (name) VALUES ($1)',
    [name],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Student named ${name} successfully added`);
    }
  );
};

module.exports = {
  getStudents,
  getStudentById,
  getStudentByName,
  getGradesById,
  addGrade,
  addStudent,
};
