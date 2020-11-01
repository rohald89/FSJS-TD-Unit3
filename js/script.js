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
//create a new option and add it to the top of the options
const selectDesign = new Option("Please select a T-shirt theme", 'select', true, true);
colorSelect.prepend(selectDesign);


// change the available colors in the select menu based on the selected design 
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
            console.log(option.textContent.indexOf('select') === -1 && option.textContent.indexOf('Puns') === -1);
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
const price = document.createElement('P');
activities.append(price);

activities.addEventListener('change', e => {
    const workshops = activities.querySelectorAll('[type="checkbox"]');
    const selectedWorkshop = e.target.getAttribute('data-day-and-time');
    let totalPrice = 0;
    workshops.forEach(workshop => {
        if(selectedWorkshop === workshop.getAttribute('data-day-and-time') && e.target !== workshop){
            workshop.disabled = true;
            workshop.parentNode.style.color = 'grey';
        }
        if(selectedWorkshop === workshop.getAttribute('data-day-and-time') && !e.target.checked){
            workshop.disabled = false;
            workshop.parentNode.style.color = 'initial';
        }
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
    if(payment.value === 'credit card'){
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    } else if(payment.value === 'paypal'){
        creditCard.hidden = true;
        creditCard.querySelectorAll('input').forEach(input => input.className = '');
        paypal.hidden = false;
        bitcoin.hidden = true;
    } else if(payment.value === 'bitcoin'){
        creditCard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    } 
};
changePayment();

payment.addEventListener('change', changePayment);

// Form validation
const nameInput = document.querySelector('#name');
const mailInput = document.querySelector('#mail');
const creditcardInput = document.querySelector('#cc-num');
const zipInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');

const validName = input => /[a-z]+/i.test(input.value) ? input.className = 'success' : input.className = 'error';
const validMail = input => /^[^@]+@[^@.]+\.[a-z]+$/i.test(input.value) ? input.className = 'success' : input.className = 'error';
const validCheckboxes = input => document.querySelectorAll('[type="checkbox"]:checked').length > 0 ? input.className = 'success' : input.className = 'error';
const validCreditCardNumber = input => /^\d{13,16}$/.test(input.value) ? input.className = 'success' : input.className = 'error';
const validZipcode = input => /^\d{5}$/.test(input.value) ? input.className = 'success' : input.className = 'error';
const validCvv = input => /^\d{3}$/.test(input.value) ? input.className = 'success' : input.className = 'error';

const submitBtn = document.querySelector('[type="submit"]');
submitBtn.addEventListener('click', e => {
    validName(nameInput);
    validMail(mailInput);
    validCheckboxes(activities);
    if(payment.value === 'credit card'){
        validCreditCardNumber(creditcardInput);
        validZipcode(zipInput);
        validCvv(cvvInput);
    }
    if(document.querySelectorAll('.error').length > 0){
        e.preventDefault();
    }
});