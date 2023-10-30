import { type } from "@testing-library/user-event/dist/type";

const data = [5, 12, 3, 6];

// sort() method converts each element to string and then compares their UTF-16 code units values.
// Ascending
data.sort((a, b) => a - b);

// Descending
data.sort((a, b) => b - a);

const data3 = ['s', 'A', 'a', 'C', 'c'];

data3.sort((a, b) => {
    return a.localeCompare(b);
});

// we need to do two things:
// 1. Transform an object
// 2. Compare two objects
const data2 = [
    { name: 'Tomato', cost: 10, weight: 5 },
    { name: 'Carrot', cost: 15, weight: 2 },
    { name: 'Onion', cost: 5, weight: 7 },
];

function getSortValue(vegetable) {
    return vegetable.cost
}

data2.sort((a, b) => {
    const valueA = getSortValue(a);
    const valueB = getSortValue(b);

    return valueA - valueB;
})

// returns a new array

// if we want to sort by any other property 
// all we have to do is update the getSortValue function, e.g.:
function getSortValue(vegetable) {
    return vegetable.cost
}

// if we want to sort by name, we can do this:

const sortOrder = 'asc';

data2.sort((a, b) => {
    const valueA = getSortValue(a);
    const valueB = getSortValue(b);

    const reverseOrder = sortOrder === 'asc' ? 1 : -1;

    if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB) * reverseOrder;
    } else {
        return (valueA - valueB) * reverseOrder;
    }
});

