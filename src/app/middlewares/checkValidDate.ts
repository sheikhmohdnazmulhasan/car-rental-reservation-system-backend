
function isValidDate(dateString: string): boolean {
    const regex = /^(?:19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    // Test the date string against the regex
    if (!regex.test(dateString)) {
        return false;
    }

    // Parse the date parts to integers
    const parts: string[] = dateString.split("-");
    const year: number = parseInt(parts[0], 10);
    const month: number = parseInt(parts[1], 10);
    const day: number = parseInt(parts[2], 10);

    // Check if the date is valid using the Date object
    const date: Date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
    );
};

export default isValidDate;
