const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', db.getStudents);
app.get('/students/:studentId', db.getStudentById);
app.get('/student', db.getStudentByName);
app.get('/grades/:studentId', db.getGradesById);
app.post('/grade', db.addGrade);
app.post('/register', db.addStudent);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
