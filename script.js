// ==========================================
// 1. GSAP Registration
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 2. Initialization & Routing
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("System initialized. GSAP & ScrollTrigger ready.");
    
    // Run global interactions (Navbar & Footer)
    initGlobalInteractions();

    // Route to correct page logic
    const currentPath = window.location.pathname;

    if (currentPath.includes("work.html")) {
        initWorkPage();
    } else if (currentPath.includes("about.html")) {
        initAboutPage();
    } else if (currentPath.includes("contact.html")) {
        initContactPage();
    } else {
        initHomePage();
    }
});

// ==========================================
// 3. Global Functions
// ==========================================
function initGlobalInteractions() {
    // Navbar Fade-in
    gsap.from(".site-header", {
        y: -20,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.1
    });

    // Navbar Scroll Effect
    const header = document.querySelector(".site-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

// ==========================================
// 4. Page-Specific Functions
// ==========================================
function initHomePage() {
    console.log("Home page logic loaded.");
}

function initWorkPage() {
    console.log("Work page logic loaded.");
}

function initAboutPage() {
    console.log("About page logic loaded.");
}

function initContactPage() {
    console.log("Contact page logic loaded.");
}
