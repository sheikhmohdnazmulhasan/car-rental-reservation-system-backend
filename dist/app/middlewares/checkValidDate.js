"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidDate(dateString) {
    const regex = /^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    // Test the date string against the regex
    if (!regex.test(dateString)) {
        return false;
    }
    // Parse the date parts to integers
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    // Check if the date is valid using the Date object
    const date = new Date(year, month - 1, day);
    return (date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day);
}
;
exports.default = isValidDate;
// console.log(isValidDate("2024-06-15")); // true
// console.log(isValidDate("2024-02-30")); // false (invalid date)
// console.log(isValidDate("2024-06-31")); // false (invalid date)
// console.log(isValidDate("2024-13-01")); // false (invalid month)
