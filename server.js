const mysql = require("mysql");
const inquirer = require("inquirer");
const { strict } = require("assert");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",
  password: "password",
  database: "theoffice_db",
});

connection.connect(function (err) {
  if (err) throw err;
  // console.log("no errors");
  start();
});

function start() {
  console.log("yay");
  inquirer
    .prompt({
      name: "options",
      type: "list",
      message: "please choose an option",
      choices: ["add dept", "add employee", "quit"],
    })
    .then(function ({ options }) {
      // console.log(answers);

      if (options === "add dept") {
        addDept();
      } else if (options === "add employee") {
        addEmployee();
      } else {
        connection.end();
      }
    });
}

function addDept() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "what's the dept name?",
    })
    .then(function ({ name }) {
      connection.query(
        "INSERT INTO department SET ?",
        { title: name },
        function (err) {
          if (err) throw err;
          start();
        }
      );
    });
}

function addEmployee() {
    connection.query("SELECT * FROM department", function(err, data){
        if (err) throw err

        //.map returns an array by default
        let depArr = data.map(function(dep){
            return {
                name: dep.title,
                value: dep.id
            }
        })
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "what's the employee's name?",
      },
      {
        name: "cool",
        type: "confirm",
        message: "is this employee cool?",
        // choices: [true, false]
      },
      {
        name: "salary",
        type: "number",
        message: "what's the employee's salary?",
      },
      {
        name: "depID",
        type: "list",
        message: "what's the dept of this employee?",
        choices: depArr
      }
     
    ])
    .then(function (answers) {
      connection.query(
        "INSERT INTO cast SET ?",
        {
          name: answers.name,
          cool: answers.cool,
          salary: answers.salary,
          department_id: answers.depID,
        },
        function (err) {
        
          if (err) throw err
          start();
        }
      );
    });
})
}

