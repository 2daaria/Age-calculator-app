const userDay = document.querySelector('#day');
const userMonth = document.querySelector('#month');
const userYear = document.querySelector('#year');
const btn = document.querySelector('#calc-btn');

// AGE CALCULATION
function calculateAge(birthDay, birthMonth, birthYear) {
    // get current date
    const today = new Date();

    // get current day, month and year
    let day = today.getDate();
    let month = today.getMonth() + 1; // +1 to have a classic numbers of months from 1 to 12
    let year = today.getFullYear();

    // DAY COUNT
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

    // MONTH COUNT
    if (month < birthMonth) {
        // If the current month is earlier than the birth month, subtract one year
        year = year - 1;
        // Add 12 to the month value to avoid negative result
        month = month + 12;
    }

    // subtract months
    month = month - birthMonth;

    // YEAR COUNT
    year = year - birthYear;

    // Return an object for easy key-based value access
    return {
        years: year,
        months: month,
        days: day
    };
}

// ERROR-ACTIONS
function showFieldError(field, message) {
    document.querySelector(`#${field}-error`).textContent = `${message}`;
    document.querySelector(`#${field}-label`).style.color = 'var(--color-red)';
    document.querySelector(`#${field}`).classList.add('input-error');
}

function clearFieldError(field) {
    document.querySelector(`#${field}-error`).textContent = "";
    document.querySelector(`#${field}-label`).style.color = 'var(--color-gray500)';
    document.querySelector(`#${field}`).classList.remove('input-error');
}

// VALIDATION
function validateFields() {
    const dayValueStr = userDay.value.trim();
    const monthValueStr = userMonth.value.trim();
    const yearValueStr = userYear.value.trim();

    const dayValue = Number(userDay.value.trim());
    const monthValue = Number(userMonth.value.trim());
    const yearValue = Number(userYear.value.trim());

    const userBirthday = new Date(yearValue, monthValue - 1, dayValue);

    let hasError = false;

    // DAY-VALIDATION
    if (dayValueStr === "") {
        showFieldError('day', "This field is required")
        hasError = true;
    } else if (dayValue < 1 || dayValue > 31) {
        showFieldError('day', "Must be a valid day")
        hasError = true;
    } else {
        clearFieldError('day')
    }

    // MONTH-VALIDATION
    if (monthValueStr === "") {
        showFieldError('month', "This field is required")
        hasError = true;
    } else if (monthValue < 1 || monthValue > 12) {
        showFieldError('month', "Must be a valid month")
        hasError = true;
    } else {
        clearFieldError('month')
    }

    // YEAR-VALIDATION
    if (yearValueStr === "") {
        showFieldError('year', "This field is required")
        hasError = true;
    } else if (yearValue > new Date().getFullYear()) {
        showFieldError('year', "Must be a valid year")
        hasError = true;
    } else {
        clearFieldError('year')
    }

    // VALIDATION FOR CORRECT DATE
    if (
        dayValueStr !== "" &&
        monthValueStr !== "" &&
        yearValueStr !== "" &&
        (
            userBirthday.getDate() !== dayValue ||
            userBirthday.getMonth() !== monthValue - 1 ||
            userBirthday.getFullYear() !== yearValue
        )
    ) {
        showFieldError('day', "Must be a valid date");
        hasError = true;
    }

    // STOP CALC IF ERROR
    if (hasError) {
        return;
    }

    return !hasError;
}

// INSTANT ERROR CLEAR OF INPUTS
userDay.addEventListener('input', function () {
    clearFieldError('day');
});
userMonth.addEventListener('input', function () {
    clearFieldError('month');
});
userYear.addEventListener('input', function () {
    clearFieldError('year');
});

// SHOW RESULT & VALIDATION
btn.addEventListener('click', function (event) {
    event.preventDefault();

    // ENTIRE VALIDATION AFTER CLICK
    const isValid = validateFields();
    if (!isValid) {
        return;
    }

    // SHOW RESULT
    const result = calculateAge(
        Number(userDay.value),
        Number(userMonth.value),
        Number(userYear.value)
    );

    document.getElementById('years-output').textContent = `${result.years}`;
    document.getElementById('months-output').textContent = `${result.months}`;
    document.getElementById('days-output').textContent = `${result.days}`;
});
























