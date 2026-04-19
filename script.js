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
// 3. GLOBAL ANIMATIONS (Navbar, Mobile Menu, Page Transitions)
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

    // --- MOBILE MENU LOGIC ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Lock body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // --- PAGE ENTRANCE TRANSITION (Bottom to Top) ---
    gsap.from("#smooth-wrapper", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all"
    });

    // --- PAGE EXIT TRANSITION (Intercepts Link Clicks) ---
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only trigger on internal HTML links that aren't the current active tab
            if (href && href.includes('.html') && !e.ctrlKey && !e.metaKey && !link.classList.contains('active')) {
                e.preventDefault(); 
                
                // Close the mobile menu automatically if it's open
                if (menuToggle && navLinks) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }

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
// 4. HOME PAGE LOGIC
// ==========================================================================
function initHomePage() {
    console.log("Home page logic loaded.");

    const heroSection = document.querySelector(".hero-section");
    const popImages = document.querySelectorAll(".hero-pop-images img");
    const textLines = document.querySelectorAll(".hero-title span"); 

    if (!heroSection || popImages.length === 0) return;

    let interactionEnabled = false; 

    const introTl = gsap.timeline();
    introTl.from(textLines, {
        y: 40, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.1           
    }).call(() => { interactionEnabled = true; }, null, "+=0.1");         

    let currentIndex = 0; let lastX = 0; let lastY = 0; let activeImage = null; 
    let zIndexCounter = 1; const minDistance = 180; 

    heroSection.addEventListener("mousemove", (e) => {
        if (!interactionEnabled) return;
        if (lastX === 0 && lastY === 0) { lastX = e.clientX; lastY = e.clientY; return; }

        const deltaX = e.clientX - lastX; const deltaY = e.clientY - lastY;
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

            activeImage = img; currentIndex = (currentIndex + 1) % popImages.length;
        }
    });

    heroSection.addEventListener("mouseleave", () => {
        if (!interactionEnabled) return;
        gsap.to(popImages, { opacity: 0, scale: 0.92, duration: 0.4, ease: "power3.out", overwrite: "auto" });
        lastX = 0; lastY = 0; activeImage = null;
    });

    gsap.to([".hero-content", ".hero-pop-images"], {
        scrollTrigger: { trigger: ".selected-works", start: "top bottom", end: "top top", scrub: true },
        scale: 0.70, y: -60, opacity: 0.2, ease: "none"
    });

    gsap.from(".selected-works .works-header", {
        scrollTrigger: { trigger: ".selected-works", start: "top 80%" },
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
    });

    // Added transform perspective for 3D flip effects
    gsap.set(".work-card", { transformPerspective: 1000 });
    
    gsap.from(".work-card", {
        scrollTrigger: { trigger: ".works-grid", start: "top 85%" },
        y: 60, 
        opacity: 0, 
        rotateY: -10, // Applying 3D spatial transformation per core directives
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power3.out"
    });

    gsap.from(".services-header", {
        scrollTrigger: { trigger: ".services-section", start: "top 85%" },
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out"
    });

    gsap.from(".service-card", {
        scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out"
    });

    const aboutTl = gsap.timeline({ scrollTrigger: { trigger: ".about-section", start: "top 80%" } });
    aboutTl.from(".about-heading", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" })
           .from(".about-row", { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.4") 
           .from(".about-image", { y: 60, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8"); 

    // --------------------------------------------------
    // G. SERVICES ACCORDION LOGIC (Mobile Only)
    // --------------------------------------------------
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                // Only run the accordion logic if the screen is mobile sized (≤768px)
                if (window.innerWidth <= 768) {
                    serviceCards.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }
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
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            gsap.to(workCards, {
                opacity: 0, y: 20, duration: 0.3, ease: "power2.in",
                onComplete: () => {
                    workCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });

                    if (typeof ScrollTrigger !== "undefined") { ScrollTrigger.refresh(); }

                    const visibleCards = Array.from(workCards).filter(c => c.style.display !== 'none');
                    gsap.to(visibleCards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" });
                }
            });
        });
    });
}

function initAboutPage() { console.log("About page logic loaded."); }
function initContactPage() { console.log("Contact page logic loaded."); }
