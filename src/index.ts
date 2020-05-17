import { Range, Validate } from './utils';

class Calculator {
    @Validate
    public updatePercentage(
        @Range(20, 70) _oldValue: number,
        @Range(20, 50) _newValue: number,
    ) {
    }
}

const calc = new Calculator();
console.log(calc)
calc.updatePercentage(40, 45);

setTimeout(() => {
    calc.updatePercentage(45, 80);
}, 5000)


type User = { name: string } | { age: number }; // { name: string , age: number }

const user: User = {
    name: 'Andrew',
}
