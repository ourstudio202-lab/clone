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

// ==========================================
// 3. Global Functions
// ==========================================
function initGlobalInteractions() {
    const header = document.querySelector(".site-header");
    
    if (!header) return; 

    if (typeof gsap !== "undefined") {
        gsap.from(header, {
            y: -20,
            opacity: 0,
            duration: 0.8,     
            ease: "power3.out",
            delay: 0.1         
        });
    }

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
    const textLines = document.querySelectorAll(".hero-title span"); 

    if (!heroSection || popImages.length === 0) return;

    // --- ENTRANCE ANIMATION & INTERACTION LOCK ---
    let interactionEnabled = false; 

    const introTl = gsap.timeline();

    // FIXED: Removed opacity fade from hero section entirely. It is fully visible instantly.
    introTl.from(textLines, {
        y: 40,
        opacity: 0,
        duration: 0.6,         
        ease: "power3.out",
        stagger: 0.1           
    })                
    .call(() => {
        interactionEnabled = true;
    }, null, "+=0.1");         


    // --- IMAGE POP INTERACTION ---
    let currentIndex = 0;
    let lastX = 0;
    let lastY = 0;
    let activeImage = null; 
    let zIndexCounter = 1;  

    const minDistance = 180; 

    heroSection.addEventListener("mousemove", (e) => {
        if (!interactionEnabled) return;

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

            if (activeImage && activeImage !== img) {
                gsap.to(activeImage, { 
                    opacity: 0, 
                    scale: 0.92, 
                    duration: 0.4, 
                    ease: "power3.out", 
                    overwrite: "auto" 
                });
            }

            gsap.killTweensOf(img);

            const rect = heroSection.getBoundingClientRect();
            
            const randomOffsetX = gsap.utils.random(-30, 30);
            const randomOffsetY = gsap.utils.random(-30, 30);
            
            const xPos = (e.clientX - rect.left) - 120 + randomOffsetX; 
            const yPos = (e.clientY - rect.top) - 150 + randomOffsetY; 

            const randomRotation = gsap.utils.random(-5, 5);
            const holdTime = gsap.utils.random(0.5, 0.8);

            gsap.set(img, {
                x: xPos,
                y: yPos,
                rotation: randomRotation, 
                scale: 0.9, 
                opacity: 0,
                zIndex: zIndexCounter++
            });

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
        lastX = 0; 
        lastY = 0;
        activeImage = null;
    });

  // --- SCROLL ANIMATIONS (HERO OVERLAP & MOTION) ---
    gsap.to([".hero-content", ".hero-pop-images"], {
        scrollTrigger: {
            trigger: ".selected-works",
            start: "top bottom", 
            end: "top top",      
            scrub: true          
        },
        scale: 0.70,       // CHANGED: Shrinks much smaller now (down to 70%)
        y: -60,            // CHANGED: Pushes slightly higher up for more depth
        opacity: 0.2,      // CHANGED: Fades out heavily into the background
        ease: "none"
    });

    // --- SCROLL ANIMATIONS (SELECTED WORKS) ---
    gsap.from(".works-header", {
        scrollTrigger: {
            trigger: ".selected-works",
            start: "top 80%", 
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".work-card", {
        scrollTrigger: {
            trigger: ".works-grid",
            start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, 
        ease: "power3.out"
    });
}

function initWorkPage() { console.log("Work page logic loaded."); }
function initAboutPage() { console.log("About page logic loaded."); }
function initContactPage() { console.log("Contact page logic loaded."); }
