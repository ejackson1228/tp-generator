const Employee = require('../lib/Employee')

// jest.mock('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('brian', 12345, 'brian@fool.com');

    expect(employee.name).toBe('brian');
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toBe('brian@fool.com');
})

test('gets employee name', () => {
    const employee = new Employee('brian', 12345, 'brian@fool.com');

    expect(employee.getName()).toBe('brian');
})

test('get employee id', ()  => {
    const employee = new Employee('brian', 12345, 'brian@fool.com');

    expect(employee.getId()).toBe(12345);
})

test('gets employee email', () => {
    const employee = new Employee('brian', 12345, 'brian@fool.com');

    expect(employee.getEmail()).toBe('brian@fool.com');
});

test('gets role', () => {
    const employee = new Employee('brian', 12345, 'brian@fool.com');

    expect(employee.getRole()).toBe('Employee')
})