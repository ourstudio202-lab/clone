// ==========================================
// 1. GSAP Registration (With Safety Check)
// ==========================================
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
} else {
    console.error("GSAP or ScrollTrigger failed to load. Check your internet connection or CDN links.");
}

// ==========================================
// 2. Initialization & Routing
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded. Initializing scripts...");
    
    // Run global interactions (Navbar & Footer)
    initGlobalInteractions();

    // Route to correct page logic
    const currentPath = window.location.pathname.toLowerCase();

    if (currentPath.includes("work")) {
        initWorkPage();
    } else if (currentPath.includes("about")) {
        initAboutPage();
    } else if (currentPath.includes("contact")) {
        initContactPage();
    } else {
        initHomePage();
    }
});

// ==========================================
// 3. Global Functions
// ==========================================
function initGlobalInteractions() {
    const header = document.querySelector(".site-header");
    
    if (!header) {
        console.warn(".site-header missing from this HTML file.");
        return; 
    }

    // Navbar Fade-in
    if (typeof gsap !== "undefined") {
        gsap.from(header, {
            y: -20,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.1
        });
    }

    // Navbar Scroll Effect
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
