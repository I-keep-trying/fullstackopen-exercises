const calculator = (a, b, op) => {
    switch (op) {
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0)
                throw new Error('Cannot divide by 0!');
            return a / b;
        case 'add':
            return a + b;
        default:
            throw new Error('Operation is not multiply, add, or divide.');
    }
};
try {
    console.log('calculator(1,5, "divide")...', calculator(1, 5, 'divide'));
}
catch (e) {
    console.log('Something went wrong, error message: ', e.message);
}
