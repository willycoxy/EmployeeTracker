const inquirer = require('inquirer')
const mysql = require('mysql2')
const fs = require('fs')
const figlet = require('figlet')
const consoleTable = require('console.table')
// const { createConnection } = require('net')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "basketball",
    database: "employeeManager"
  });
  
  con.connect(function(err) {
    console.log("Connected!");
  });

  const start = () => {
    figlet.text("Employee Manager", function (err,data) {
        console.log(data)
        promptSelection()
    })        
  }
   

  const promptSelection = () => { 
    return inquirer.prompt([
        {
            type: "list",
            name: "select",
            message: "What would you like to do?",
            choices: ["View All Employees","Add Employee","View All Roles","Add Role","View All Departments","Add Department","Quit"]
        },
    ])

    .then(({select}) =>{
        if (select === "View All Employees") {
            promptViewAllEmployees()
        } else if (select === "Add Employee") {
            promptAddEmployee()
        // } else if (select === "Update Employee Role") {
        //     promptUpdateEmployeeRole()
        } else if (select === "View All Roles") {
            promptViewAllRoles() 
        } else if (select=== "Add Role") {
            promptAddRole()
        } else if (select === "View All Departments"){
            promptViewAllDepartments() 
        } else if (select === "Add Department") {
            promptAddDepartment()
        } else if (select === "Quit"){
            promptQuit()
        }       
    });
  }

// View all employees
  const promptViewAllEmployees = () => {
    con.query(`SELECT * FROM employee;`, function(err, table){
        console.table(table)
       promptSelection()
    })
  }

  const promptAddEmployee = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter new employee's first name (Required)"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter new employee's last name (Required)"
        },
        {
            type: "input",
            name: "role_id",
            message: "Enter new employee's role ID number (Required)"
        },
        {
            type: "input",
            name: "manager_id",
            message: "Does your new employee have a manager ID number? NUM or NULL (Required)"
        }
    ])
    .then(function(employeeAnswers) {
        // console.log(employeeAnswers)
        con.query("INSERT INTO employee SET ?", {
            first_name:employeeAnswers.first_name,
            last_name:employeeAnswers.last_name,
            role_id:employeeAnswers.role_id,
            manager_id:employeeAnswers.manager_id
        }, function(error){
            if (error) throw error;
            console.log("Employee Added!")
            promptSelection();
        })
    })
  }

//   const promptUpdateEmployeeRole = () =>{
//     return inquirer.prompt([
//     {
//         type: "input",
//         name: "first_name",
//         message: "Enter employee's first name (Required)"
//     },
//     {
//         type: "input",
//         name: "last_name",
//         message: "Enter employee's last name (Required)"
//     },
//     ])
        // .then(function(Update){
        //     con.query("UPDATE employee SET ?", {
                
        //     }, function(error){
        //         if (error) throw error;
        //         console.log("Employee Role Updated")
        //     })
        // })
//   }

  const promptViewAllRoles = () => {
    con.query(`SELECT * FROM role;`, function(err, table){
        console.table(table)
        promptSelection()
    })
  }
  const promptAddRole = () => {
   return inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "Please enter title of new role"
    },
    {
        type: "input",
        name: "salary",
        message: "Please enter salary of new role"
    },
    {
        type: "input",
        name: "department_id",
        message: "What department id would you like to assign to the new role"
    }
   ])
   .then(function(addrole) {
    con.query("INSERT INTO role SET ?", {
        title: addrole.title,
        salary: addrole.salary,
        department_id: addrole.department_id
        }, function(error){
            if (error) throw error;
            console.log("Role Added!")
            promptSelection();
        })
    })
  }

  const promptViewAllDepartments = () => {
    con.query(`SELECT * FROM department;`, function(err, table){
        console.table(table)
        promptSelection()
    })
  }

  const promptAddDepartment = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the department name"
        }
    ])
    .then(function(adddepartment) {
        con.query("INSERT INTO department SET ?", {
            name: adddepartment.name
        }, function (error){
            if (error) throw error;
            console.log("Department Added!")
            promptSelection()
        })
    })
  }

  const promptQuit = () => {
    process.exit()
  }

  start();