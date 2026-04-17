// ==========================================
// 1. GSAP Registration
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 2. Initialization & Routing
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("System initialized. GSAP & ScrollTrigger ready.");
    
    // Run interactions that appear on every page (Nav, Footer, etc.)
    initGlobalInteractions();

    // Determine which page we are on based on the URL
    const currentPath = window.location.pathname;

    if (currentPath.includes("work.html")) {
        initWorkPage();
    } else if (currentPath.includes("about.html")) {
        initAboutPage();
    } else if (currentPath.includes("contact.html")) {
        initContactPage();
    } else {
        // Default to Home page logic if no other match is found
        initHomePage();
    }
});

// ==========================================
// 3. Page-Specific Functions
// ==========================================

function initGlobalInteractions() {
    // Code for global navbar / menu / footer animations
}

function initHomePage() {
    console.log("Home page logic loaded.");
    // GSAP animations for index.html
}

function initWorkPage() {
    console.log("Work page logic loaded.");
    // GSAP animations for work.html
}

function initAboutPage() {
    console.log("About page logic loaded.");
    // GSAP animations for about.html
}

function initContactPage() {
    console.log("Contact page logic loaded.");
    // GSAP animations for contact.html
}
