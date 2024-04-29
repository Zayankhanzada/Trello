
window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});



//  workflow-section JS
var swiper = new Swiper('.firstswiper', {
    slidesPerView: 1,
    loop: false,
    initialSlide: 0,
    centeredSlides: false,
    spaceBetween: 30,
    breakpoints: {
        320: {
            slidesPerView: 1.2,
            spaceBetween: 20,
        },
        576: {
            slidesPerView: 1.2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 2.5,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    },
    navigation: {
        nextEl: '.next',
        prevEl: '.previous',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'progressbar', // Use 'progressbar' for a slider-type pagination
    },

});


//  feedback-section swiper JS 

var swiper = new Swiper('.seceond-swiper', {
    slidesPerView: 1,
    initialSlide: 0,
    spaceBetween: 400,
    centeredSlides: true,
    navigation: {
        prevEl: '.previous',
        nextEl: '.next',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,

    }
});

// price card range JS

document.addEventListener('DOMContentLoaded', function () {
    var rangeInputs = document.getElementsByClassName('user-count');
    var userCostDisplays = document.getElementsByClassName('user-cost'); // This line seems unnecessary as there's no element with the class 'user-cost' in your HTML
    var priceDisplays = document.getElementsByClassName('price');
    var maxRangeTexts = document.getElementsByClassName('max-range-text');
    // Loop through all range inputs
    for (var i = 0; i < rangeInputs.length; i++) {
        rangeInputs[i].addEventListener('input', function () {
            var userCount = parseInt(this.value);
            var priceDisplay = this.closest('.card').querySelector('.price'); // Find the price display within the closest parent card element
            var userCountDisplay = this.closest('.card').querySelector('.user-count'); // Find the user count display within the closest parent card element
            userCountDisplay.textContent = userCount;
            var targetId = this.getAttribute('data-target');
            var maxRangeText = document.getElementById(targetId);
            // Calculate the price based on the user count
            var price = calculatePrice(userCount);
            priceDisplay.textContent = price.toFixed(2);

            if (userCount >= 5000) {
                maxRangeText.classList.remove('d-none');
            } else {
                maxRangeText.classList.add('d-none');
            }
        });
    }

    // Function to calculate the price based on the user count
    function calculatePrice(userCount) {
        // Your calculation logic goes here
        // For example, let's assume the price increases by $1 for every 100 users
        return 17.50 + (userCount / 100);
    }
});

// price card height checker

// Get all card elements
window.addEventListener('load', function () {
    adjustCardHeights();
});

window.addEventListener('resize', function () {
    adjustCardHeights();
});

function adjustCardHeights() {
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    let maxHeight = 0;

    // Find the tallest card height
    cardWrappers.forEach(function (cardWrapper) {
        const card = cardWrapper.querySelector('.card');
        const cardHeight = card.offsetHeight;
        if (cardHeight > maxHeight) {
            maxHeight = cardHeight;
        }
    });

    // Set the height of all cards to the tallest height
    cardWrappers.forEach(function (cardWrapper) {
        cardWrapper.style.height = maxHeight + 'px';
    });
}

// Listen for changes in the range input
document.querySelectorAll('.user-count').forEach(function (input) {
    input.addEventListener('input', function () {
        const maxRangeText = this.nextElementSibling.nextElementSibling;
        const cardWrapper = this.closest('.card-wrapper');

        // Check if max range text is visible
        if (maxRangeText.classList.contains('d-none')) {
            return;
        }

        // Recalculate card heights
        adjustCardHeights();
    });
});


// Call the function when the window is loaded and resized
window.addEventListener('load', setMaxHeight);
window.addEventListener('resize', setMaxHeight);
