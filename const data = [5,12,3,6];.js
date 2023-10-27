const data = [5, 12, 3, 6];

// sort() method converts each element to string and then compares their UTF-16 code units values.
// Ascending
data.sort((a, b) => a - b);

// Descending
data.sort((a, b) => b - a);

// another way to sort descending

data.sort((a, b) => b - a).reverse();