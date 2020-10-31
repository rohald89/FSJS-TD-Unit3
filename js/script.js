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
const selectDesign = new Option("Please select a T-shirt theme", '', true, true);
colorSelect.prepend(selectDesign);


// change the available colors in the select menu based on the selected design 
const changeColorSelect = () => {
    const colorOptions = document.querySelectorAll('#color option');
    const shirtColors = document.querySelector('#shirt-colors');
    colorOptions.forEach(option => option.hidden = true);
     if (designSelect.value ==='js puns'){
        shirtColors.hidden = false;
        colorOptions.forEach(option => {
            if(option.textContent.indexOf('Puns') !== -1){
                option.hidden = false;
                option.selected = true;
            }
        });
    } else if (designSelect.value === 'heart js'){
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
        }
        if(selectedWorkshop === workshop.getAttribute('data-day-and-time') && !e.target.checked){
            workshop.disabled = false;
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

const validName = name => /[a-z]+/i.test(name.value);
const validMail = mail => /^[^@]+@[^@.]+\.[a-z]+$/i.test(mail.value);
const validCheckboxes = () => document.querySelectorAll('[type="checkbox"]:checked').length > 0 ? true : false;
const validCreditCardNumber = credit => /^\d{13,16}$/.test(credit.value);
const validZipcode = zip => /^\d{5}$/.test(zip.value);
const validCvv = cvv => /^\d{3}$/.test(cvv.value);

const validateCreditcard = () => {
    if(validCreditCardNumber(creditcardInput.value) &&
    validZipcode(zipInput.value) &&
    validCvv(cvvInput.value)){
        return true;
    } else {
        return false;
    }
}

const submitBtn = document.querySelector('[type="submit"]');
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    if(validName(nameInput)){
        nameInput.style.border = "5px solid green";
    } else {
        nameInput.style.border = "5px solid red";
    }
})