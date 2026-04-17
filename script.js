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

    const heroSection = document.querySelector(".hero-section");
    const popImages = document.querySelectorAll(".hero-pop-images img");

    if (!heroSection || popImages.length === 0) return;

    let currentIndex = 0;
    let lastX = 0;
    let lastY = 0;
    let activeImage = null; // Tracks the currently visible image to prevent overlap
    let zIndexCounter = 1;  

    // INCREASED DISTANCE: Mouse must now move 250 pixels before a new image appears
    const minDistance = 250; 

    heroSection.addEventListener("mousemove", (e) => {
        if (lastX === 0 && lastY === 0) {
            lastX = e.clientX;
            lastY = e.clientY;
            return;
        }

        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > minDistance) {
            lastX = e.clientX;
            lastY = e.clientY;

            const img = popImages[currentIndex];

            // NO OVERLAP RULE: Force the previous image to fade out instantly
            if (activeImage && activeImage !== img) {
                gsap.to(activeImage, { 
                    opacity: 0, 
                    scale: 0.95, 
                    duration: 0.4, 
                    overwrite: "auto" 
                });
            }

            gsap.killTweensOf(img);

            const rect = heroSection.getBoundingClientRect();
            
            // RANDOMIZED SCATTER: Shifts image between -80px and +80px from cursor
            const randomOffsetX = gsap.utils.random(-80, 80);
            const randomOffsetY = gsap.utils.random(-80, 80);
            
            const xPos = (e.clientX - rect.left) + randomOffsetX - 120; 
            const yPos = (e.clientY - rect.top) + randomOffsetY - 180; 

            // RANDOMIZED TILT: Rotates image between -25 and +25 degrees
            const randomRotation = gsap.utils.random(-25, 25);

            gsap.set(img, {
                x: xPos,
                y: yPos,
                rotation: randomRotation, 
                scale: 0.8,
                opacity: 0,
                zIndex: zIndexCounter++
            });

            // ANIMATION: Smooth pop in, hold, then fade out
            gsap.timeline()
                .to(img, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" })
                .to(img, { opacity: 0, scale: 0.95, duration: 0.5, ease: "power2.inOut" }, "+=1.0");

            activeImage = img;
            currentIndex = (currentIndex + 1) % popImages.length;
        }
    });

    // Clean up completely if the mouse leaves the hero section
    heroSection.addEventListener("mouseleave", () => {
        gsap.to(popImages, { opacity: 0, scale: 0.95, duration: 0.4, overwrite: "auto" });
        lastX = 0; 
        lastY = 0;
        activeImage = null;
    });
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
