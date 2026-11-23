
/* FUN FACT BUTTON */

const facts = [
    "Ashyo dreams of becoming a successful singer! 🎤",

    "One of his biggest dreams is to meet BIGBANG! 🌟",

    "His favourite sport is rugby! 🏉",

    "He enjoys fishing for prawns! 🎣",

    "His favourite colour is blue! 💙",

    "His life motto is Agi Idup Agi Ngelaban! 💪"
];

function showFact() {

    const randomIndex = Math.floor(
        Math.random() * facts.length
    );

    document.getElementById("fun-fact").textContent =
        facts[randomIndex];

}


/* PHOTO CAROUSEL */

let currentSlide = 0;

const track = document.querySelector(".carousel-track");

const slides = document.querySelectorAll(".carousel-slide");

const dotsContainer = document.getElementById("carousel-dots");

const totalSlides = slides.length;

let autoSlide;


/* CREATE NAVIGATION DOTS */

slides.forEach((slide, index) => {

    const dot = document.createElement("button");

    dot.classList.add("dot");

    dot.setAttribute("aria-label", "Go to picture " + (index + 1));

    dot.addEventListener("click", function() {

        showSlide(index);

        restartAutoSlide();

    });

    dotsContainer.appendChild(dot);

});


const dots = document.querySelectorAll(".dot");


/* DISPLAY SELECTED PICTURE */

function showSlide(index) {

    currentSlide = (index + totalSlides) % totalSlides;

    track.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentSlide
        );

    });

}


/* NEXT AND PREVIOUS BUTTONS */

function changeSlide(direction) {

    showSlide(currentSlide + direction);

    restartAutoSlide();

}


/* AUTOMATIC SLIDESHOW */

function startAutoSlide() {

    stopAutoSlide();

    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {
        return;
    }

    autoSlide = setInterval(function() {

        showSlide(currentSlide + 1);

    }, 5000);

}


function stopAutoSlide() {

    clearInterval(autoSlide);

}


function restartAutoSlide() {

    startAutoSlide();

}


/* PAUSE WHEN MOUSE ENTERS CAROUSEL */

const carousel = document.querySelector(".carousel");

carousel.addEventListener("mouseenter", stopAutoSlide);

carousel.addEventListener("mouseleave", startAutoSlide);


/* PAUSE WHEN CAROUSEL RECEIVES KEYBOARD FOCUS */

carousel.addEventListener("focusin", stopAutoSlide);

carousel.addEventListener("focusout", function(event) {

    if (!carousel.contains(event.relatedTarget)) {
        startAutoSlide();
    }

});


/* START CAROUSEL */

showSlide(0);

startAutoSlide();



/* BACK TO TOP BUTTON */

const backButton = document.getElementById("back-to-top");

window.addEventListener("scroll", function() {

    backButton.classList.toggle(
        "show",
        window.scrollY > 400
    );

});


function backToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

/* SCROLL REVEAL ANIMATION */

const revealElements = document.querySelectorAll(
    ".section, .motto-section"
);

if (
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    const revealObserver = new IntersectionObserver(
        function(entries, observer) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function(element) {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

}


/* IMAGE LIGHTBOX */

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const lightboxCaption = document.getElementById("lightbox-caption");


/* OPEN ENLARGED IMAGE */

function showLightbox(index) {

    showSlide(index);

    const selectedSlide = slides[currentSlide];

    const selectedImage = selectedSlide.querySelector("img");

    const selectedCaption = selectedSlide.querySelector(
        ".slide-caption h3"
    );

    lightboxImage.src = selectedImage.src;

    lightboxImage.alt = selectedImage.alt;

    lightboxCaption.textContent =
        selectedCaption ? selectedCaption.textContent : "";

    lightbox.classList.add("show");

    stopAutoSlide();

}


/* CLOSE ENLARGED IMAGE */

function closeLightbox() {

    lightbox.classList.remove("show");

    startAutoSlide();

}


/* CHANGE ENLARGED IMAGE */

function changeLightboxImage(direction) {

    showLightbox(currentSlide + direction);

}


/* MAKE GALLERY PICTURES CLICKABLE */

slides.forEach((slide, index) => {

    const image = slide.querySelector("img");

    image.addEventListener("click", function() {

        showLightbox(index);

    });

});


/* CLOSE WHEN CLICKING OUTSIDE THE IMAGE */

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* KEYBOARD CONTROLS */

document.addEventListener("keydown", function(event) {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {

        closeLightbox();

    }

    if (event.key === "ArrowRight") {

        changeLightboxImage(1);

    }

    if (event.key === "ArrowLeft") {

        changeLightboxImage(-1);

    }

});
