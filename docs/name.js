
        const words = ["infrastructure", "code", "complexity", "software", "design"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typewriterEl = document.getElementById('typewriter');

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // GSAP ANIMATIONS
        gsap.registerPlugin(ScrollTrigger);

        function initAnimations() {
            gsap.from("#hero-content > *", {
                opacity: 0,
                y: 40,
                duration: 1.5,
                stagger: 0.15,
                ease: "expo.out"
            });

            document.querySelectorAll('.reveal').forEach((el) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    y: 30,
                    duration: 1.2,
                    ease: "power3.out"
                });
            });

            gsap.to(".grid-bg", {
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5
                },
                y: -80,
                ease: "none"
            });
        }

        // INITIALIZE ON LOAD
        window.addEventListener('DOMContentLoaded', () => {
            type();
            initAnimations();
        });
