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

const validName = () => /[a-z]+/i.test(nameInput.value);
const validMail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(mailInput.value);
const validCheckboxes = () => document.querySelectorAll('[type="checkbox"]:checked').length > 0 ? true : false;
const validCreditCardNumber = () => /^\d{13,16}$/.test(creditcardInput.value);
const validZipcode = () => /^\d{5}$/.test(zipInput.value);
const validCvv = () => /^\d{3}$/.test(cvvInput.value);

const validateCreditcard = () => {
    console.log(payment.value)
    if(payment.value === 'credit card'){
        console.log('check');
        if(validCreditCardNumber(creditcardInput.value) &&
        validZipcode(zipInput.value) &&
        validCvv(cvvInput.value)){
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
    
}

const submitBtn = document.querySelector('[type="submit"]');
submitBtn.addEventListener('click', e => {
    if(((!validName() || !validMail() || !validCheckboxes()) && payment.value !== 'credit card') || ((!validCreditCardNumber() || !validZipcode() || !validCvv()) && payment.value === 'credit card')){
        e.preventDefault();
    }
    if(validName()){
        nameInput.style.border = "5px solid green";
    } else {
        nameInput.style.border = "5px solid red";
    }
    if(validMail()){
        mailInput.style.border = "5px solid green";
    } else {
        mailInput.style.border = "5px solid red";
    }
    if(validCheckboxes()){
        activities.style.border = "5px solid green";
    } else {
        activities.style.border = "5px solid red";
    } 
    if(payment.value === 'credit card'){
        if(validCreditCardNumber()){
            creditcardInput.style.border = "5px solid green";
        } else {
            creditcardInput.style.border = "5px solid red";
        } 
        if(validZipcode()){
            zipInput.style.border = "5px solid green";
        } else {
            zipInput.style.border = "5px solid red";
        } 
        if(validCvv()){
            cvvInput.style.border = "5px solid green";
        } else {
            cvvInput.style.border = "5px solid red";
        } 
    }
});