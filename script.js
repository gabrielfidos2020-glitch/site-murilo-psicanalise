document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.scroll-anim, .fade-up, .fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));


    // --- Subtle Parallax Effect ---
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        if(window.innerWidth < 992) return; // Disable parallax on smaller screens for performance

        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.05;
            // Calculate position relative to viewport
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });


    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

});
