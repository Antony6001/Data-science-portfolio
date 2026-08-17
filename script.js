// =========================================================
// Anthony R — Modern Portfolio interactions
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");
    const scrollTop = document.getElementById("scrollTop");
    const year = document.getElementById("year");

    // Current year
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Mobile navigation
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navItems.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Header + active navigation + back-to-top
    const updateScrollUI = () => {
        const y = window.scrollY;

        if (header) {
            header.classList.toggle("scrolled", y > 20);
        }

        if (scrollTop) {
            scrollTop.classList.toggle("show", y > 550);
        }

        let current = "home";

        sections.forEach(section => {
            const top = section.offsetTop - 170;
            const bottom = top + section.offsetHeight;

            if (y >= top && y < bottom) {
                current = section.id;
            }
        });

        navItems.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    };

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    // Back to top
    if (scrollTop) {
        scrollTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Reveal-on-scroll
    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add("visible"));
    }

    // Tiny parallax effect for hero glow
    const heroVisual = document.querySelector(".hero-visual");

    if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
        heroVisual.addEventListener("mousemove", event => {
            const rect = heroVisual.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            heroVisual.style.transform =
                `translate3d(${x * 7}px, ${y * 7}px, 0)`;
        });

        heroVisual.addEventListener("mouseleave", () => {
            heroVisual.style.transform = "translate3d(0, 0, 0)";
        });
    }

    console.log("Anthony R — Modern portfolio loaded successfully.");
});
