const Manager = require('../lib/Manager');

test('creates a manager object with employee info', () => {
    const manager  = new Manager('reece', 420, 'reece@mock.com', 69);

    expect(manager.name).toBe('reece');
    expect(manager.id).toBe(420);
    expect(manager.email).toBe('reece@mock.com');
    expect(manager.officeNumber).toBe(69);
})

test('returns manager role', () => {
    const manager = new Manager('reece', 420, 'reece@mock.com', 69)

    expect(manager.getRole()).toBe('Manager');
})