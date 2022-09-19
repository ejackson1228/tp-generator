const generateManager = function (manager) {
    return `
    <div class="">
        <div class="card">
            <div class="card-header">
                <h3>${manager.name}</h3>
                <h3>Manager</h3>
            </div>

            <div class="card-body">
                <p class="id"> EmployeeID: ${manager.id}</p>
                <p class="email"> Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
                <p class="office"> Office Number: ${manager.officeNumber}</p>
            </div>
        </div>
    </div> `;
};

const generateEngineer = function (engineer) {
    return `
    <div class="">
        <div class="card">
            <div class="card-header">
                <h3>${engineer.name}</h3>
                <h3>Engineer</h3>
            </div>

            <div class="card-body">
                <p class="id"> EmployeeID: ${engineer.id}</p>
                <p class="email"> Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
                <p class="github"> Github: <a href="${engineer.getGithub()}">${engineer.github}</a></p>
            </div>
        </div>
    </div> `
};

const generateIntern = function (intern) {
    return `
    <div class="">
        <div class="card">
            <div class="card-header">
                <h3>${intern.name}</h3>
                <h3> Intern </h3>
            </div>

            <div class="card-body">
                <p class="id"> EmployeeID: ${intern.id}</p>
                <p class="email"> Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
                <p class="school"> School: ${intern.school}</p>
            </div>
        </div>
    </div>`;
};

const generateCardsHTML = (employeeArray) =>  {
    cardsArray = [];

    for (let i=0; i < employeeArray.length; i++) {
        const employee = employeeArray[i];
        const role = employee.getRole();

        if (role === 'Manager') { // generate manager card with generateManager
            const managerCard = generateManager(employee);

            cardsArray.push(managerCard);
        }
        if (role === 'Engineer') { //create an engineer card with generateEngineer
            const engineerCard = generateEngineer(employee);

            cardsArray.push(engineerCard);
        }
        if (role === 'Intern') { //create an intern card with generateIntern
            const internCard = generateIntern(employee);

            cardsArray.push(internCard);
        }
    }
    // join cards as string of array for generatePage formatting
    const teamCards = cardsArray.join('');
    
    const generateTeamCards = generatePage(teamCards);
    
    return generateTeamCards;


}

const generatePage = function (teamCards) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <link rel="stylesheet" href="./style.css">
    </head>

    <body>
        <header class="page-header">
            <h1>Team Profile</h1>
        </header>

        <main>
            <div class="container">
                <div class="row justify-content-center">
                    ${teamCards} <!--formatted 'string of array' of cards-->
                </div>
            </div>
        </main>

    </body>
    </html>
    `;
}

module.exports = generateCardsHTML;