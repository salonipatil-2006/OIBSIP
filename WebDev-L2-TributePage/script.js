// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

const revealElements = document.querySelectorAll(
    ".section, .quote-section, .timeline-item, .achievement-card, .legacy"
);

const revealOnScroll = () => {
    revealElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// ==============================
// BACK TO TOP BUTTON
// ==============================

const topButton = document.createElement("button");

topButton.innerHTML = "↑";
topButton.className = "top-button";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        topButton.classList.add("visible");
    } else {
        topButton.classList.remove("visible");
    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==============================
// HERO PARALLAX EFFECT
// ==============================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (window.scrollY < window.innerHeight) {

        hero.style.backgroundPosition =
            `center ${window.scrollY * 0.35}px`;

    }

});