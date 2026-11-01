// ===== PAGE INTRO ANIMATION =====

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {
        loader.classList.add("hide");
    }, 2500);

});


// ===== SCROLL ANIMATION =====

const revealElements = document.querySelectorAll(
    "section, .project-card, .skill"
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(function (element) {
    observer.observe(element);
});
// ===== GLOBAL DARK MODE =====

const darkModeBtn = document.getElementById("darkModeBtn");

// पहले से सेव की गई Dark Mode setting लागू करो
if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
}

function updateDarkModeButton() {
    if (darkModeBtn) {
        darkModeBtn.textContent =
            document.body.classList.contains("dark-mode")
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";
    }
}

updateDarkModeButton();

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "on");
        } else {
            localStorage.setItem("darkMode", "off");
        }

        updateDarkModeButton();
    });
}



;
// ===== TYPING TEXT ANIMATION =====

const typingText = document.getElementById("typingText");

if (typingText) {
    const words = [
        "Student",
        "Future Web Developer",
        "Creative Thinker",
        "Problem Solver"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        typingText.textContent =
            currentWord.substring(0, charIndex);

        if (!deleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, 100);
        } 
        else if (!deleting) {
            deleting = true;
            setTimeout(typeEffect, 1200);
        } 
        else if (charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 50);
        } 
        else {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 300);
        }
    }

    typeEffect();
}
// ===== BACK TO TOP FUNCTION =====

const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }

    });

    backToTopBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
// ===== PROJECT FILTER FUNCTION =====

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedFilter = button.dataset.filter;

        // Active button change
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Filter projects
        projectCards.forEach(function (card) {

            const categories = card.dataset.category || "";

            if (
                selectedFilter === "all" ||
                categories.split(" ").includes(selectedFilter)
            ) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }

        });

    });

});
}// ===== TESTIMONIALS SLIDER =====

const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".testimonial-dot");

const prevTestimonial = document.getElementById("prevTestimonial");
const nextTestimonial = document.getElementById("nextTestimonial");

const testimonialArea = document.querySelector(".testimonial-slider");

if (
    testimonialSlides.length > 0 &&
    testimonialDots.length === testimonialSlides.length &&
    prevTestimonial &&
    nextTestimonial
) {
    let currentSlide = 0;
    let testimonialTimer;

    function showTestimonial(index) {

        testimonialSlides[currentSlide].classList.remove("active");
        testimonialDots[currentSlide].classList.remove("active");

        currentSlide = (index + testimonialSlides.length) %
                       testimonialSlides.length;

        testimonialSlides[currentSlide].classList.add("active");
        testimonialDots[currentSlide].classList.add("active");
    }

    function startTestimonialTimer() {
        clearInterval(testimonialTimer);

        testimonialTimer = setInterval(function () {
            showTestimonial(currentSlide + 1);
        }, 4000);
    }

    nextTestimonial.addEventListener("click", function () {
        showTestimonial(currentSlide + 1);
        startTestimonialTimer();
    });

    prevTestimonial.addEventListener("click", function () {
        showTestimonial(currentSlide - 1);
        startTestimonialTimer();
    });

    testimonialDots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {
            showTestimonial(index);
            startTestimonialTimer();
        });

    });

    if (testimonialArea) {
        testimonialArea.addEventListener("mouseenter", function () {
            clearInterval(testimonialTimer);
        });

        testimonialArea.addEventListener("mouseleave", function () {
            startTestimonialTimer();
        });
    }

    startTestimonialTimer();
}// ===== SKILL PROGRESS ANIMATION =====

const progressBars = document.querySelectorAll(".progress-fill");

if (progressBars.length > 0) {

    const progressObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const bar = entry.target;
                    const value = bar.dataset.progress;

                    bar.style.setProperty("--progress", value + "%");
                    bar.classList.add("show");

                    progressObserver.unobserve(bar);
                }

            });

        },
        { threshold: 0.5 }
    );

    progressBars.forEach(function (bar) {
        progressObserver.observe(bar);
    });
    }
// ===== SCROLL PROGRESS INDICATOR =====
const scrollProgress = document.getElementById("scrollProgress");

if (scrollProgress) {
    window.addEventListener("scroll", function () {
        const scrollTop = window.scrollY;
        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        scrollProgress.style.width = progress + "%";
    });
}
// ===== CUSTOM MOUSE CURSOR =====
const customCursor = document.getElementById("customCursor");

if (customCursor) {
    document.addEventListener("mousemove", function (event) {
        customCursor.style.left = event.clientX + "px";
        customCursor.style.top = event.clientY + "px";
    });
}
// ===== HAMBURGER MENU =====

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");
    });
}