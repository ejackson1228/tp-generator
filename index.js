const generateCardsHTML  = require('./src/generate')

// team profiles
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// node modules
const fs = require('fs');
const inquirer = require('inquirer');



// array to be filled by all gathered employees
const employeeArray = [];

const addManager = () => {
    console.log(`
    ======================================

    Welcome to the Team Profile Generator!

    Please answer all questions about your
    team to the best of your ability!

    ======================================
    `)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: "Who is the manager of this team?"
        },
        {
            type: 'input',
            name: 'managerID',
            message: "What is the Manager's ID?"
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is the manager's email?"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the manager's office number?"
        }
    ])
    .then(managerInfo => {
        const { managerName, managerID, managerEmail, officeNumber } = managerInfo; // define maanager data to be used
        const manager = new Manager(managerName, managerID, managerEmail, officeNumber); // create new manager with defined data

        employeeArray.push(manager); //push manager to employee array
        console.log(manager);
        
       // addEmployee();
    })
};

const addEmployee = () =>  {
    console.log(`
    ===================

    Adding Employees...

    ===================
    `)
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: 'What kind of employee would you like to add?',
                choices: ['Engineer', 'Intern']
            },
            {
                type: 'input',
                name: 'employeeName',
                message: "What is the employee's name?"
            },
            {
                type: 'input',
                name: 'employeeID',
                message: "What is the employee's ID?"
            },
            {
                type: 'input',
                name: 'employeeEmail',
                message: "What is the employee's email?"
            },
            {
                type: 'input',
                name: 'github',
                message: "What is the Engineer's github username?",
                when: (input) => input.role === 'Engineer' // when user selects engineer as employee "type", ask this question
            },
            {
                type: 'input',
                name: 'school',
                message: "What school is your intern from?",
                when: (input) => input.role === 'Intern' // when user selects intern as employee "type", ask this question
            },
            {
                type: 'confirm',
                name: 'confirmAddEmployee',
                message: "Would you like to add another employee?",
                default: false
            }

        ])
        .then(employeeData => {
            let { employeeName, employeeID, employeeEmail, role, github, school } = employeeData
            let employee 
            if (role === 'Engineer') { // if employee role an engineer, create a new engineer
                employee = new Engineer (employeeName, employeeID, employeeEmail, github);
                console.log(employee);
            } else if (role === 'Intern') { // if employee role is intern, create a a new intern
                employee = new Intern  (employeeName, employeeID, employeeEmail, school);
                console.log(employee);
            }
                employeeArray.push(employee); //push employee to employee array

            if (employeeData.confirmAddEmployee === true) { // if user chose to add another employee
                return addEmployee(employeeArray); // return to employee "type" question
            } else  {
                return employeeArray; // if user did not want more employees return the final employee array
            }
           
            
        });
};

const writeFile = data => { // with the data passed, write file index.html
    fs.writeFile('./dist/index.html', data, err =>{
        //if error
        if (err) {
            console.log(err); // if err, display err in console
            return;
        } else {
            console.log("Success! Please view index.html to visit your Team Profile!")
        }
    })
};


addManager()
.then(addEmployee)
.then(employeeArray => { 
    return generateCardsHTML(employeeArray);
})
.then(pageHTML => {
    return writeFile(pageHTML);
})
.catch(err => {
    console.log(err);
});