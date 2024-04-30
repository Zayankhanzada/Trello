
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
function showImage(index) {
    galleryTop.slideTo(index);
}

function toggleActive(element) {
    var boxes = document.querySelectorAll('.box');
    boxes.forEach(function (box) {
        box.classList.remove('active');
    });
    element.classList.add('active');
}

var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 'auto',
    direction: '',
});

var galleryTop = new Swiper('.gallery-top', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: {
            el: '.gallery-thumbs',
            slidesPerView: 'auto',
            direction: 'vertical',
            spaceBetween: 10,
            breakpoints: {
                1200: {
                    direction: 'vertical',
                },
                768: {
                    direction: 'vertical',
                },
                320: {
                    direction: 'horizontal'
                }
            }
        }
    },
    on: {
        slideChangeTransitionStart: function () {
            var activeIndex = this.realIndex;
            var boxes = document.querySelectorAll('.box');
            boxes.forEach(function (box) {
                box.classList.remove('active');
            });
            var activeBox = document.querySelector('.box[data-index="' + activeIndex + '"]');
            activeBox.classList.add('active');
        }
    }
});

function updateActiveBox() {
    var activeIndex = galleryTop.realIndex;
    var boxes = document.querySelectorAll('.box');
    boxes.forEach(function (box) {
        box.classList.remove('active');
    });
    var activeBox = document.querySelector('.box[data-index="' + activeIndex + '"]');
    activeBox.classList.add('active');
}

galleryTop.on('resize', function () {
    if (window.innerWidth < 768) {
        galleryTop.thumbs.swiper.params.direction = 'horizontal';
        updateActiveBox();
    } else {
        galleryTop.thumbs.swiper.params.direction = 'vertical';
    }
    galleryTop.thumbs.swiper.update();
});

// Initial call to update active box on page load
updateActiveBox();





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
