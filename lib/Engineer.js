const Employee = require('./Employee')

class Engineer extends Employee {
    constructor(name = '', id = '', email = '', github = '') {
        // call parent constructor
        super(name, id, email);

        this.github = github;
        this.role = 'Engineer';
    }

    getGithub() {
        this.github = `https://github.com/${this.github}`; // return link to github using github entry from prompt
        
        return this.github;
    }

    getRole() {
        return this.role;
    }
}

module.exports = Engineer;