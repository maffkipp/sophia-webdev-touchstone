const radioOptions = document.querySelectorAll('input[name="request"]');
const pickupRadio = document.getElementById("pickup-radio");
const pickupInfoSection = document.getElementById("pickup-information-section");

// Shows/hides the pickup info form fields depending on if the pickup radio option is selected
function setPickupFieldsVisibility() {
    pickupInfoSection.hidden = !pickupRadio.checked;
}

// Recheck whether we are showing these fields each time the radio group updates
radioOptions.forEach((radio) => {
    radio.addEventListener("change", setPickupFieldsVisibility);
});

// Also check on load in case the radio group's value is saved in advance
setPickupFieldsVisibility();
