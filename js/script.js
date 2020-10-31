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
    colorOptions.forEach(option => option.hidden = true);
    if(designSelect.value === 'Select Theme'){
        colorOptions.forEach(option => {
            if(option.textContent.indexOf('select') !== -1){
                option.hidden = false;
                option.selected = true;
            }
        });
    } else if (designSelect.value ==='js puns'){
        colorOptions.forEach(option => {
            if(option.textContent.indexOf('Puns') !== -1){
                option.hidden = false;
                option.selected = true;
            }
        });
    } else {
        colorOptions.forEach(option => {
            console.log(option.textContent.indexOf('select') === -1 && option.textContent.indexOf('Puns') === -1);
            if(option.textContent.indexOf('select') === -1 && option.textContent.indexOf('Puns') === -1 ){
                option.hidden = false;
                option.selected = true;
            }
        });
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
            console.log('found one!')
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