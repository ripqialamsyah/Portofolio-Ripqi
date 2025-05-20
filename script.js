// Wait until DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeHeader();
    initializeTypedText();
    initializeSkillBars();
    initializePortfolioFilter();
    initializeTestimonialSlider();
    initializeContactForm();
    initializeBackToTop();
});

// Header scroll effect
function initializeHeader() {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    // Add sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on navigation items
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Highlight active menu item on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Typing animation for hero section
function initializeTypedText() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;

    const texts = ['UI/UX Designer', 'Web Developer', 'Digital Marketing', 'Freelancer'];
    let index = 0;
    let textIndex = 0;
    let isDeleting = false;
    let text = '';

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            text = currentText.substring(0, index - 1);
            index--;
        } else {
            text = currentText.substring(0, index + 1);
            index++;
        }

        typedTextElement.textContent = text;

        let typeSpeed = isDeleting ? 50 : 150;
        
        if (!isDeleting && index === currentText.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// Animate skill bars when in viewport
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width || '0%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Portfolio filtering
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial slider
function initializeTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    
    // Show initial slide
    slides[currentSlide].classList.add('active');
    
    // Function to show specific slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Handle loop
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
    }
    
    // Event listeners for next/prev buttons
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // Auto slide every 5 seconds
    const autoSlide = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Clear interval when hovering over testimonial section
    const testimonialSection = document.querySelector('.testimonials');
    testimonialSection.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
}

// Contact form submission
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Simple validation
        if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
            alert('Mohon lengkapi semua kolom!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Mohon masukkan alamat email yang valid!');
            return;
        }
        
        // Form is valid - you would normally send data to server here
        alert('Pesan Anda telah terkirim! Terima kasih.');
        contactForm.reset();
    });
}

// Back to top button
function initializeBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        
        const headerOffset = document.querySelector('header').offsetHeight;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.section-header, .service-card, .portfolio-item, .about-content, .contact-content');

function revealOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.classList.add('reveal-element'); // Add initial class
        observer.observe(element);
    });
}

// Initialize reveal animations
revealOnScroll();

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (!emailInput.value) {
            alert('Mohon masukkan alamat email Anda!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Mohon masukkan alamat email yang valid!');
            return;
        }
        
        // Form is valid
        alert('Terima kasih telah berlangganan newsletter kami!');
        newsletterForm.reset();
    });
}

// Add animation classes for CSS transitions
document.head.insertAdjacentHTML('beforeend', `
<style>
    .reveal-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .portfolio-item {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
</style>
`);