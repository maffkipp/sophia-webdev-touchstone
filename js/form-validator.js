const form = document.querySelector("form");

// Primary form validation runs on submit, error messages only clear on the next submit
form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrorMessages();

    const validated = validateForm();
    if (validated) form.submit();
});

// An array of validator definitions to be run against the form. The order for multiple validators for
// the same field determines error message priority.
const validators = [
    {
        field: "name",
        element: "input",
        validate: checkRequired,
        errorMessage: "Name is a required field",
    },
    {
        field: "email",
        element: "input",
        validate: checkEmail,
        errorMessage: "Must contain a valid email address",
    },
    {
        field: "date",
        element: "input",
        validate: checkRequired,
        errorMessage: "Order date is required",
    },
    {
        field: "date",
        element: "input",
        validate: checkDateIsInTheFuture,
        errorMessage: "Pickup date cannot be in the past",
    },
    {
        field: "details",
        element: "textarea",
        validate: checkRequired,
        errorMessage: "Order details are required",
    },
];

// Loops over validators, setting the first failed check in the error message for each field and returning
// a boolean representing whether the form validated successfully.
function validateForm() {
    const errorFields = [];

    for (const validator of validators) {
        const selector = `${validator.element}[name="${validator.field}"]`;
        const fieldElement = document.querySelector(selector);

        if (fieldElement?.checkVisibility() && !errorFields.includes(validator.field)) {
            const isValid = validator.validate(fieldElement.value);
            if (!isValid) {
                addErrorMessageToField(validator.field, validator.errorMessage);
                errorFields.push(validator.field);
            }
        }
    }

    return errorFields.length === 0;
}

function checkRequired(value) {
    return value.trim().length > 0;
}

function checkEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
}

// Convert the "yyyy-mm-dd" format to a js date, then compare to today at midnight
function checkDateIsInTheFuture(value) {
    const [year, month, day] = value.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate.getTime() >= today.getTime();
}

function addErrorMessageToField(field, errorMessage) {
    const errorElement = document.getElementById(`${field}-error`);
    errorElement.textContent = "* " + errorMessage;
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => (element.textContent = ""));
}
