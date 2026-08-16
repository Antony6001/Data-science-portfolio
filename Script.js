// ===============================
// Anthony R Portfolio - script.js
// ===============================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (targetId && targetId !== "#") {
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});


// ===============================
// Mobile Navigation
// ===============================

const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector("nav");

if (navLinks && nav) {

    const menuButton = document.createElement("button");

    menuButton.innerHTML = "☰";
    menuButton.className = "menu-toggle";
    menuButton.setAttribute("aria-label", "Open navigation menu");

    nav.insertBefore(menuButton, navLinks);

    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu after clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}


// ===============================
// Active Navigation Link
// ===============================

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


// ===============================
// Scroll To Top Button
// ===============================

const scrollTopButton = document.createElement("button");

scrollTopButton.innerHTML = "↑";
scrollTopButton.id = "scrollTop";
scrollTopButton.title = "Back to top";

document.body.appendChild(scrollTopButton);

scrollTopButton.style.display = "none";

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }

});

scrollTopButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===============================
// Footer Year
// ===============================

const footer = document.querySelector("footer p");

if (footer) {

    const currentYear = new Date().getFullYear();

    footer.innerHTML =
        `© ${currentYear} Anthony R. All Rights Reserved.`;

}


// ===============================
// Page Loaded
// ===============================

console.log("Anthony R Portfolio loaded successfully!");