const Intern = require('../lib/Intern')

test('creates an intern object', () => {
    const intern = new Intern('caleb', 999, 'caleb@intern.com', 'UNC');

    expect(intern.name).toBe('caleb');
    expect(intern.id).toBe(999);
    expect(intern.email).toBe('caleb@intern.com')
})

test("returns intern's school name", () => {
    const intern = new Intern('caleb', 999, 'caleb@intern.com', 'UNCC');

    expect(intern.getSchool()).toBe('UNCC');
})

test('returns interns role', () => {
    const intern = new Intern('caleb', 999, 'caleb@intern.com', 'UNCC');

    expect(intern.getRole()).toBe('Intern');
})