// ==========================================================================
// 1. GSAP REGISTRATION
// ==========================================================================
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
} else {
    console.error("GSAP or ScrollTrigger failed to load. Check your internet connection or CDN links.");
}

// ==========================================================================
// 2. ROUTING CONTROLLER
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded. Initializing scripts...");
    
    initGlobalInteractions();

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

// ==========================================================================
// 3. GLOBAL ANIMATIONS (Navbar & Page Transitions)
// ==========================================================================
function initGlobalInteractions() {
    const header = document.querySelector(".site-header");
    
    if (header && typeof gsap !== "undefined") {
        gsap.from(header, { y: -20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.1 });
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- PAGE ENTRANCE TRANSITION (Bottom to Top) ---
    // Every time a page loads, it smoothly glides up into place
    gsap.from("#smooth-wrapper", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all"
    });

    // --- PAGE EXIT TRANSITION (Intercepts Link Clicks) ---
    // Smoothly slides the current page up and away before loading the next one
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only trigger on internal HTML links that aren't the current active tab
            if (href && href.includes('.html') && !e.ctrlKey && !e.metaKey && !link.classList.contains('active')) {
                e.preventDefault(); // Stop instant navigation
                
                // Slide up and fade out before changing the page
                gsap.to("#smooth-wrapper", {
                    y: -60, 
                    opacity: 0,
                    duration: 0.5,
                    ease: "power3.inOut",
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });
}

// ==========================================================================
// 4. HOME PAGE LOGIC (ScrollTriggers & Hover Effects)
// ==========================================================================
function initHomePage() {
    console.log("Home page logic loaded.");

    const heroSection = document.querySelector(".hero-section");
    const popImages = document.querySelectorAll(".hero-pop-images img");
    const textLines = document.querySelectorAll(".hero-title span"); 

    if (!heroSection || popImages.length === 0) return;

    // --------------------------------------------------
    // A. HERO ENTRANCE (Title loads in)
    // --------------------------------------------------
    let interactionEnabled = false; 

    const introTl = gsap.timeline();
    introTl.from(textLines, {
        y: 40,
        opacity: 0,
        duration: 0.6,         
        ease: "power3.out",
        stagger: 0.1           
    }).call(() => {
        interactionEnabled = true;
    }, null, "+=0.1");         


    // --------------------------------------------------
    // B. HERO IMAGE POPUP LOGIC (Mouse movement)
    // --------------------------------------------------
    let currentIndex = 0;
    let lastX = 0;
    let lastY = 0;
    let activeImage = null; 
    let zIndexCounter = 1;  
    const minDistance = 180; 

    heroSection.addEventListener("mousemove", (e) => {
        if (!interactionEnabled) return;
        if (lastX === 0 && lastY === 0) { lastX = e.clientX; lastY = e.clientY; return; }

        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > minDistance) {
            lastX = e.clientX; lastY = e.clientY;
            const img = popImages[currentIndex];

            if (activeImage && activeImage !== img) {
                gsap.to(activeImage, { opacity: 0, scale: 0.92, duration: 0.4, ease: "power3.out", overwrite: "auto" });
            }

            gsap.killTweensOf(img);
            const rect = heroSection.getBoundingClientRect();
            const randomOffsetX = gsap.utils.random(-30, 30);
            const randomOffsetY = gsap.utils.random(-30, 30);
            const xPos = (e.clientX - rect.left) - 120 + randomOffsetX; 
            const yPos = (e.clientY - rect.top) - 150 + randomOffsetY; 
            const randomRotation = gsap.utils.random(-5, 5);
            const holdTime = gsap.utils.random(0.5, 0.8);

            gsap.set(img, { x: xPos, y: yPos, rotation: randomRotation, scale: 0.9, opacity: 0, zIndex: zIndexCounter++ });
            gsap.timeline()
                .to(img, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" })
                .to(img, { opacity: 0, scale: 0.92, duration: 0.4, ease: "power3.out" }, `+=${holdTime}`);

            activeImage = img;
            currentIndex = (currentIndex + 1) % popImages.length;
        }
    });

    heroSection.addEventListener("mouseleave", () => {
        if (!interactionEnabled) return;
        gsap.to(popImages, { opacity: 0, scale: 0.92, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        lastX = 0; lastY = 0; activeImage = null;
    });

    // --------------------------------------------------
    // C. SCROLL: HERO PARALLAX (Shrinks into background)
    // --------------------------------------------------
    gsap.to([".hero-content", ".hero-pop-images"], {
        scrollTrigger: { trigger: ".selected-works", start: "top bottom", end: "top top", scrub: true },
        scale: 0.70,       
        y: -60,            
        opacity: 0.2,      
        ease: "none"
    });

    // --------------------------------------------------
    // D. SCROLL: SELECTED WORKS REVEAL
    // --------------------------------------------------
    gsap.from(".selected-works .works-header", {
        scrollTrigger: { trigger: ".selected-works", start: "top 80%" },
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
    });

    gsap.from(".work-card", {
        scrollTrigger: { trigger: ".works-grid", start: "top 85%" },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"
    });

    // --------------------------------------------------
    // E. SCROLL: SERVICES REVEAL
    // --------------------------------------------------
    gsap.from(".services-header", {
        scrollTrigger: { trigger: ".services-section", start: "top 85%" },
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
    });

    gsap.from(".service-card", {
        scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out"
    });

    // --------------------------------------------------
    // F. SCROLL: ABOUT US REVEAL
    // --------------------------------------------------
    const aboutTl = gsap.timeline({
        scrollTrigger: { trigger: ".about-section", start: "top 80%" }
    });

    aboutTl.from(".about-heading", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" })
           .from(".about-row", { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.4") 
           .from(".about-image", { y: 60, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8"); 
}

// ==========================================================================
// 5. WORK PAGE LOGIC (Filters)
// ==========================================================================
function initWorkPage() { 
    console.log("Work page logic loaded."); 
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active state to clicked button (triggers CSS underline animation)
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Fade out current grid
            gsap.to(workCards, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    // Toggle visibility based on category
                    workCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });

                    // Trigger ScrollTrigger refresh so grid spacing recalculates
                    if (typeof ScrollTrigger !== "undefined") {
                        ScrollTrigger.refresh();
                    }

                    // Fade the new filtered cards back in, slightly staggered
                    const visibleCards = Array.from(workCards).filter(c => c.style.display !== 'none');
                    gsap.to(visibleCards, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power3.out"
                    });
                }
            });
        });
    });
}

function initAboutPage() { console.log("About page logic loaded."); }
function initContactPage() { console.log("Contact page logic loaded."); }
