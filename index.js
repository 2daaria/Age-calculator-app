const userDay = document.querySelector('#day');
const userMonth = document.querySelector('#month');
const userYear = document.querySelector('#year');

const btn = document.querySelector('#calc-btn');

function calculateAge(birthDay, birthMonth, birthYear) {
    // get current date
    const today = new Date();

    // get current day, month and year
    let day = today.getDate();
    let month = today.getMonth() + 1; // +1 to have a classic numbers of months from 1 to 12
    let year = today.getFullYear();

    // ----DAY COUNT----
    if (day < birthDay) {
        // If the current day is earlier than the birthday, subtract one month
        month = month - 1;

        // define previous month and year
        let prevMonth;
        let prevMonthYear;
        if (month === 0) {
            // if the month value is 0, it indicates that the current month is January (1 - 1 = 0), so the previous month would be December of the previous year
            prevMonth = 12;
            prevMonthYear = year - 1;
        } else {
            prevMonth = month;
            prevMonthYear = year;
        }
        // determine how many days were in the previous month
        const daysInPrevMonth = new Date(prevMonthYear, prevMonth, 0).getDate();
        // add days from the previous month to the current day, then subtract the birthday
        day = day + daysInPrevMonth - birthDay;
        // day = day - birthDay;
    } else {
        day = day - birthDay;
    }

    // ----MONTH COUNT----
    if (month < birthMonth) {
        // If the current month is earlier than the birth month, subtract one year
        year = year - 1;
        // Add 12 to the month value to avoid negative result
        month = month + 12;
    }

    // subtract months
    month = month - birthMonth;

    // ----YEAR COUNT----
    year = year - birthYear;

    // Return an object for easy key-based value access
    return {years: year, months: month, days: day};
}


btn.addEventListener('click', function (event) {
    event.preventDefault();

    const result = calculateAge(
        Number(userDay.value),
        Number(userMonth.value),
        Number(userYear.value)
    );

    document.getElementById('years-output').textContent = `${result.years}`;
    document.getElementById('months-output').textContent = `${result.months}`;
    document.getElementById('days-output').textContent = `${result.days}`;
});

