// Preload images for smooth transitions
function preloadImages(container) {
    const images = container.querySelectorAll('img');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight;

        // Calculate the target position with offset
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Add scroll effect for navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// Add logo click-to-top functionality
document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu toggle with improved functionality
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('active');
    navToggle.innerHTML = isMenuOpen ? '×' : '☰';
};

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !navLinks.contains(e.target)) {
        toggleMenu();
    }
});

// Enhanced Automatic Slideshow functionality
document.querySelectorAll('.slideshow-container').forEach(container => {
    // Preload images
    preloadImages(container);

    const slides = container.querySelectorAll('.slides');
    let currentSlide = 0;
    let isTransitioning = false;

    function showSlide(n) {
        if (isTransitioning) return;
        isTransitioning = true;

        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.classList.remove('active');
        });

        setTimeout(() => {
            slides[n].style.opacity = '1';
            slides[n].classList.add('active');
            isTransitioning = false;
        }, 50);
    }

    // Show first slide
    if (slides.length > 0) {
        showSlide(0);
    }

    // Auto advance slides with smooth transition
    if (slides.length > 1) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
});


