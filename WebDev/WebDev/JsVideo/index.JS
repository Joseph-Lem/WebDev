console.log('yeah');
let name = 'Joe';
console.log(name);

const IntrestRate = .5;
console.log(IntrestRate);

//object literal
let person = {
    name: 'Joe',
    years: 30
}
//dot notation
person.name = 'Lemieux'
//bracket notation
let selection = 'name'
person[selection] = "Will"

console.log(person.name)

//arrays
let selectColors = ['red', 'blue'];
selectColors[2] = 1;
console.log(selectColors[1]);
console.log(selectColors.length);

function greet(name, lastName) {
console.log('Its 6 oclock in the morning, ' + lastName + ' ' + name);
}

greet('mike', 'ermantraut');

function square (num) {
return num*num;
}

console.log(square(2));