const generateCardsHTML  = require('./src/generate')

// team profiles
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// node modules
const fs = require('fs');
const inquirer = require('inquirer');



// employee array
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
        const { managerName, managerID, managerEmail, officeNumber } = managerInfo;
        const manager = new Manager(managerName, managerID, managerEmail, officeNumber);

        employeeArray.push(manager);
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
                when: (input) => input.role === 'Engineer'
            },
            {
                type: 'input',
                name: 'school',
                message: "What school is your intern from?",
                when: (input) => input.role === 'Intern'
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
            if (role === 'Engineer') {
                employee = new Engineer (employeeName, employeeID, employeeEmail, github);
                console.log(employee);
            } else if (role === 'Intern') {
                employee = new Intern  (employeeName, employeeID, employeeEmail, school);
                console.log(employee);
            }
                employeeArray.push(employee);

            if (employeeData.confirmAddEmployee === true) {
                return addEmployee(employeeArray);
            } else  {
                return employeeArray;
            }
           
            
        });
};

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err =>{
        //if error
        if (err) {
            console.log(err);
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