
let slides = document.querySelectorAll(".slide");
// Get all dots
let dots = document.querySelectorAll(".dot");
// Keep track of which slide is showing
let currentIndex = 0;

function showSlide(index) {
    // If we go past the last slide,
    // return to the first slide
    if (index >= slides.length) {
        currentIndex = 0;
    }
    // If we go before the first slide,
    // go to the last slide
    else if (index < 0) {
        currentIndex = slides.length - 1;
    }
    // Otherwise use the selected slide
    else {
        currentIndex = index;
    }
    // Remove active from every slide
    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });
    // Remove active from every dot
    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });
    // Show current slide
    slides[currentIndex].classList.add("active");
    // Highlight current dot
    dots[currentIndex].classList.add("active");

}


function changeSlide(direction) {

    showSlide(currentIndex + direction);

}


function currentSlide(index) {

    showSlide(index);

}


setInterval(function() {

    changeSlide(1);

}, 5000);