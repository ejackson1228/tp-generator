const Engineer = require('../lib/Engineer')

test('creates engineer object', () => {
    const engineer = new Engineer('reggie', 100, 'reggie@engineer.com', 'reggiegigas');

    expect(engineer.name).toBe('reggie');
    expect(engineer.id).toBe(100);
    expect(engineer.email).toBe('reggie@engineer.com');
})

test('creates a github url with github username', () => {
    const engineer = new Engineer('reggie', 100, 'reggie@engineer.com', 'reggiegigas');

    expect(engineer.getGithub()).toBe('https://github.com/reggiegigas');
})

test('returns employee role as engineer', () => {
    const engineer = new Engineer('reggie', 100, 'reggie@engineer.com', 'reggiegigas');

    expect(engineer.role).toBe('Engineer');
})