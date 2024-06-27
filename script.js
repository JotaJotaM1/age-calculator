document.addEventListener('DOMContentLoaded', function () {
    // Populate day dropdown
    const daySelect = document.getElementById('day');
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    // Populate month dropdown with names
    const monthSelect = document.getElementById('month');
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    monthNames.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1; // Month numbers are 1-12
        option.textContent = month;
        monthSelect.appendChild(option);
    });
});

document.getElementById('age-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    let validationMessage = '';

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        validationMessage = 'All fields are required.';
    } else if (day < 1 || day > 31) {
        validationMessage = 'Day must be between 1 and 31.';
    } else if (month < 1 || month > 12) {
        validationMessage = 'Month must be between 1 and 12.';
    } else if (year < 1) {
        validationMessage = 'Year must be a positive number.';
    } else {
        const today = new Date();
        const birthDate = new Date(year, month - 1, day);

        if (birthDate > today) {
            validationMessage = 'Date cannot be in the future.';
        } else if (birthDate.getDate() !== day || birthDate.getMonth() + 1 !== month) {
            validationMessage = 'Invalid date.';
        }
    }

    if (validationMessage) {
        alert(validationMessage);
        return;
    }

    const today = new Date();
    let ageYears = today.getFullYear() - year;
    let ageMonths = today.getMonth() - (month - 1);
    let ageDays = today.getDate() - day;

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    animateNumbers(document.getElementById('years'), ageYears);
    animateNumbers(document.getElementById('months'), ageMonths);
    animateNumbers(document.getElementById('days'), ageDays);
});

function animateNumbers(element, number) {
    element.textContent = 0;
    let current = 0;
    const increment = Math.ceil(number / 100);

    const interval = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number;
            clearInterval(interval);
        } else {
            element.textContent = current;
        }
    }, 10);
}
