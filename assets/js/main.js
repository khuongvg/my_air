var $ = (selector) => document.querySelector(selector);
var $$ = (selector) => document.querySelectorAll(selector);

// Element
var searchBtnElement = $('.header__form-search-btn');
var menuElement = $('.header__wr-menu');
var formElements = Array.from($$('.header__form-item'));
var calendarBtn = $('.header__form-date-btn[category="calendar"]');
var flexibleBtn = $('.header__form-date-btn[category="flexible"]');
var durationBtns = Array.from($$('.header__form-duration-time'));
var selectedMonths = Array.from($$('.header__form-month-wrapper'));

// Display menu
menuElement.onclick = function(e) {
    e.stopPropagation();
    $('.header__wrapper-menu').classList.toggle('display-menu');
}

// Form click event
formElements.forEach(formItem => {
    formItem.onclick = function(e) {
        e.stopPropagation();
        if (e.target.closest('.header__form-item') === this) {                        
            // Add active for element clicked
            this.classList.add('active');
            // Add selecting for form list
            $('.header__form-list').classList.add('selecting');
            // Focus on input element
            let inputElement = this.querySelector('.header__form-input');
            if (inputElement) {
                inputElement.focus();
            }
            // Clear active of rest element
            const restElement = formElements.filter(form => form !== this);
            restElement.forEach(form => form.classList.remove('active'));
            // Display searh button
            displaySearchButton();
        }
    }
})

// Inside Date Form 
$('.header__form-date').onclick = function(e) {
    e.stopPropagation();
}

calendarBtn.onclick = function(e) {
    e.stopPropagation();
    calendarBtn.classList.add('active');
    $('.header__form-date-container').classList.add('active');

    flexibleBtn.classList.remove('active');
    $('.header__form-date-wrapper').classList.remove('active');
}

flexibleBtn.onclick = function(e) {
    e.stopPropagation();
    calendarBtn.classList.remove('active');
    $('.header__form-date-container').classList.remove('active');

    flexibleBtn.classList.add('active');
    $('.header__form-date-wrapper').classList.add('active');
}

// Inside Flexible Date Form
durationBtns.forEach(button => {
    button.onclick = function(e) {
        e.stopPropagation();
        durationBtns.forEach(btn => {
            if (e.target.closest('.header__form-duration-time') === btn) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        })
    }
});

selectedMonths.forEach(month => {
    month.onclick = function(e) {
        e.stopPropagation();

        if (e.target.closest('.header__form-month-wrapper') === this) {
            this.classList.toggle('active');        
            if (!selectedMonths.some(month => month.classList.contains('active'))) {
                this.classList.add('active');
            }
        }
    }
})

// Customer Quantity
var decreasedButtons = Array.from($$('.header__form-customer-decrease'));
var increasedButtons = Array.from($$('.header__form-customer-increase'));

decreasedButtons.forEach(button => {
    button.onclick = function(e) {
        e.stopPropagation();

        if (!this.classList.contains('disabled')) {
            const parentElement = button.parentElement;
            const min = 0;

            const increasedButton = parentElement.querySelector('.header__form-customer-increase');
            increasedButton.classList.remove('disabled');

            let quantityElement = parentElement.querySelector('.header__form-customer-number');

            number = parseInt(quantityElement.textContent);
            number -= 1;

            if (number === min) {
                this.classList.add('disabled');
            }        

            quantityElement.textContent = number;                            
        }
    }
})

increasedButtons.forEach(button => {
    button.onclick = function(e) {
        e.stopPropagation();

        if (!this.classList.contains('disabled')) {
            const parentElement = button.parentElement;
            const max = 16;

            const decreasedButton = parentElement.querySelector('.header__form-customer-decrease');
            decreasedButton.classList.remove('disabled');

            let quantityElement = parentElement.querySelector('.header__form-customer-number');
            
            number = parseInt(quantityElement.textContent);
            number += 1;
            
            if (number === max) {
                this.classList.add('disabled');
            }        

            quantityElement.textContent = number;   
        }
    }
})


// Search Button Click Event
function displaySearchButton() {
    $('.header__form-customer').classList.add('change-size');
    $('.header__form-search-name').classList.add('display-block');
    searchBtnElement.classList.add('change-color');
}

function hideSearchButton() {
    $('.header__form-customer').classList.remove('change-size');
    $('.header__form-search-name').classList.remove('display-block');
    searchBtnElement.classList.remove('change-color');
}

searchBtnElement.onclick = function(e) {
    e.stopPropagation();
    if (e.target.closest('.header__form-search-btn') === this) {
        displaySearchButton();
    }
}

window.onclick = function() {
    console.log('window onclick');
    // Hide menu
    $('.header__wrapper-menu').classList.remove('display-menu');

    // Clear all selected form 
    formElements.forEach(form => form.classList.remove('active'));

    // Clear class selecting on header form list
    $('.header__form-list').classList.remove('selecting');

    //Hide search button
    searchBtnElement.classList.remove('change-color');
    hideSearchButton();
    
}

 