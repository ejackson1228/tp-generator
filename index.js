

// team profiles
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// node modules
const fs = require('fs');
const inquirer = require('inquirer');
const { resolve } = require('path');



// employee array
const employeeArray = [];

const addManager = () => {
    inquirer.prompt([
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
    });
};

const addEmployee = () =>  {
    console.log(`
    ===================

    Adding Employees...

    ===================
    `)
    inquirer
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
                name: 'addEmployee',
                message: "Would you like to add another employee?",
                default: false
            }

        ])
}