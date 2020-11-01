// set the first input element in focus on pageload
document.querySelector('#name').focus();

// Your job role input field gets hidden 
const otherTitle = document.querySelector('#other-title');
otherTitle.style.display = 'none';
// Make the input appear when Other is selected from the JobRole menu
document.querySelector('#title').addEventListener('change', e => {
    if(e.target.value === 'other'){
        otherTitle.style.display = 'initial';
    }else {
        otherTitle.style.display = 'none';
    }
});

// set Color select text to 'Please select a T-shirt theme' when no design is selected
const designSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
// Create a new option and add it to the top of the options
const selectDesign = new Option("Please select a T-shirt theme", 'select', true, true);
colorSelect.prepend(selectDesign);


// Change the available colors in the select menu based on the selected design 
const changeColorSelect = () => {
    const colorOptions = document.querySelectorAll('#color option');
    const shirtColors = document.querySelector('#shirt-colors');
    colorOptions.forEach(option => option.hidden = true);
     if (designSelect.value ==='js puns'){
        designSelect.firstElementChild.disabled = true;
        shirtColors.hidden = false;
        colorOptions.forEach(option => {
            if(option.textContent.indexOf('Puns') !== -1){
                option.hidden = false;
                option.selected = true;
            }
        });
    } else if (designSelect.value === 'heart js'){
        designSelect.firstElementChild.disabled = true;
        shirtColors.hidden = false;
        colorOptions.forEach(option => {
            if(option.textContent.indexOf('select') === -1 && option.textContent.indexOf('Puns') === -1 ){
                option.hidden = false;
                option.selected = true;
            }
        });
    } else {
            shirtColors.hidden = true;
    }
};
changeColorSelect();

// check for a change in the design select menu to trigger the colorSelect to change
designSelect.addEventListener('change', changeColorSelect);

// workshops
const activities = document.querySelector('.activities');
// create new P element to add the price
const price = document.createElement('P');
activities.append(price);

// check for changes when a checkbox is clicked
activities.addEventListener('change', e => {
    const workshops = activities.querySelectorAll('[type="checkbox"]');
    // store the day and time of the selected workshop
    const selectedWorkshop = e.target.getAttribute('data-day-and-time');
    let totalPrice = 0;
    // loop over all workshops to see if the clicked workshop occures at the same time as another workshop
    workshops.forEach(workshop => {
        // when date and time are the same disable the other workshop
        if(selectedWorkshop === workshop.getAttribute('data-day-and-time') && e.target !== workshop){
            workshop.disabled = true;
            workshop.parentNode.style.color = 'var(--fog)';
            workshop.parentNode.style.textDecoration = "line-through";
        }
        // when there is a workshop deselected change it back to initial state
        if(selectedWorkshop === workshop.getAttribute('data-day-and-time') && !e.target.checked){
            workshop.disabled = false;
            workshop.parentNode.style.color = 'initial';
            workshop.parentNode.style.textDecoration = "none";
        }
        // calculate the total price of all the selected workshops
        if(workshop.checked){
            totalPrice += parseInt(workshop.dataset.cost);
        }
    });
    price.textContent = `Total: $${totalPrice}`;
});

const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
document.querySelector('[value="credit card"]').selected = true;
document.querySelector('[value="select method"]').disabled = true;
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');


const changePayment = () => {
    // when creditcard is selected hide other payment methods
    if(payment.value === 'credit card'){
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    // when paypal is selected hide other payment methods
    } else if(payment.value === 'paypal'){
        creditCard.hidden = true;
        // reset the classes on the credit card inputs so when it showed an error before changing the payment
        // it doesn't throw any error anymore. 
        creditCard.querySelectorAll('input').forEach(input => input.className = '');
        paypal.hidden = false;
        bitcoin.hidden = true;
    // when bitcoin is selected hide other payment methods
    } else if(payment.value === 'bitcoin'){
        creditCard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    } 
};
// call function right away to set creditcard to active on page load
changePayment();

payment.addEventListener('change', changePayment);

// Form validation
const nameInput = document.querySelector('#name');
const mailInput = document.querySelector('#mail');
const creditcardInput = document.querySelector('#cc-num');
const zipInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');

// validation for all input fields when returned true add the class of 'success' for green styling
// when returned false give the input the class of 'error' for the red styling
const validName = input => /^[a-zA-Z\s]*$/i.test(input.value) ? input.className = 'success' : input.className = 'error';
const validMail = input => /^[^@]+@[^@.]+\.[a-z]+$/i.test(input.value) ? input.className = 'success' : input.className = 'error';
const validCheckboxes = input => document.querySelectorAll('[type="checkbox"]:checked').length > 0 ? input.className = 'success' : input.className = 'error';
const validCreditCardNumber = input => /^\d{13,16}$/.test(input.value) ? input.className = 'success' : input.className = 'error';
const validZipcode = input => /^\d{5}$/.test(input.value) ? input.className = 'success' : input.className = 'error';
const validCvv = input => /^\d{3}$/.test(input.value) ? input.className = 'success' : input.className = 'error';

// when user hits the submitbutton call all the validation functions declared above
document.querySelector('[type="submit"]').addEventListener('click', e => {
    validName(nameInput);
    validMail(mailInput);
    validCheckboxes(activities);
    // only run the next validation functions when the payment method is said to creditcard
    if(payment.value === 'credit card'){
        validCreditCardNumber(creditcardInput);
        validZipcode(zipInput);
        validCvv(cvvInput);
    }
    // check to see if there are any errors, if there are stop the form from being submitted
    if(document.querySelectorAll('.error').length > 0){
        e.preventDefault();
    }
});


// Event listeners for each of the inputs making the tool tip appear aslong as the value doesn't pass validation
nameInput.addEventListener('keyup', () => {
    if (validName(nameInput) === 'success'){
        nameInput.nextElementSibling.style.display = 'none';
    } else {
        nameInput.nextElementSibling.style.display = 'initial';
    }
});

mailInput.addEventListener('keyup', () => {
    const input = mailInput.value;
    mailInput.className = '';
    validMail(mailInput);
    mailInput.nextElementSibling.style.display = 'initial';
    // change tooltip text when an @ is missing
    if(input.indexOf('@') === -1){
        mailInput.nextElementSibling.textContent = 'Your email must include an @ symbol';
    // change tooltip text when a . is missing
    } else if(input.indexOf('.') === -1){
        mailInput.nextElementSibling.textContent = 'Your email must include a .';
    //
    } else if(validMail(mailInput) !== 'success'){
        mailInput.nextElementSibling.textContent = 'Enter a valid email address';
    }else {
        mailInput.nextElementSibling.style.display = 'none';
        // validMail(mailInput);
    }
});

creditcardInput.addEventListener('keyup', () => {
    if (validCreditCardNumber(creditcardInput) === 'success'){
        creditcardInput.nextElementSibling.style.display = 'none';
    } else {
        creditcardInput.nextElementSibling.style.display = 'initial';
    }
});

zipInput.addEventListener('keyup', () => {
    if (validZipcode(zipInput) === 'success'){
        zipInput.nextElementSibling.style.display = 'none';
    } else {
        zipInput.nextElementSibling.style.display = 'initial';
    }
});

cvvInput.addEventListener('keyup', () => {
    if (validCvv(cvvInput) === 'success'){
        cvvInput.nextElementSibling.style.display = 'none';
    } else {
        cvvInput.nextElementSibling.style.display = 'initial';
    }
})

// display the tooltip when input is on focus except for checkbox and select elements.
document.addEventListener('focusin', e => {
    if(e.target.tagName === "INPUT" && e.target.type !== 'checkbox' && e.target.type !== "select-one"){
        e.target.nextElementSibling.style.display = 'initial';
    }
});
// hide tooltip when input gets out of focus
document.addEventListener('focusout', e => {
    if(e.target.tagName === "INPUT" && e.target.type !== 'checkbox' && e.target.type !== "select-one"){
        e.target.nextElementSibling.style.display = 'none';
    }
});