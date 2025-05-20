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
// Enhanced Contact form submission with Gmail integration
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Store original button text
        const originalButtonText = submitButton.innerHTML;
        
        // Simple validation
        if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
            showAlert('Mohon lengkapi semua kolom!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showAlert('Mohon masukkan alamat email yang valid!', 'error');
            return;
        }
        
        // Show loading state
        submitButton.innerHTML = '<span class="spinner"></span> Mengirim...';
        submitButton.disabled = true;
        
        try {
            // Method 1: Using EmailJS (Recommended)
            await sendEmailWithEmailJS({
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            });
            
        } catch (error) {
            console.error('EmailJS failed, trying alternative method:', error);
            
            // Method 2: Fallback to mailto (opens email client)
            sendEmailWithMailto({
                name: nameInput.value,
                email: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            });
        } finally {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Method 1: EmailJS Integration (requires setup)
async function sendEmailWithEmailJS(formData) {
    // You need to sign up at https://www.emailjs.com/ and get these credentials
    const serviceID = 'service_nzg8q3d'; // Replace with your service ID
    const templateID = 'template_7bo88d7'; // Replace with your template ID
    const publicKey = 'GephoRB_sVSlBEUy-'; // Replace with your public key
    
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'alamsyahripqi@gmail.com' // Replace with your Gmail address
    };
    
    try {
        const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
        
        if (response.status === 200) {
            showAlert('Pesan Anda telah terkirim! Terima kasih.', 'success');
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('EmailJS response not OK');
        }
    } catch (error) {
        console.error('EmailJS Error:', error);
        throw error; // Re-throw to trigger fallback
    }
}

// Method 2: Mailto fallback (opens default email client)
function sendEmailWithMailto(formData) {
    const subject = encodeURIComponent(`[Website Contact] ${formData.subject}`);
    const body = encodeURIComponent(
        `Nama: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subjek: ${formData.subject}\n\n` +
        `Pesan:\n${formData.message}\n\n` +
        `---\n` +
        `Dikirim dari website pada ${new Date().toLocaleString('id-ID')}`
    );
    
    const mailtoLink = `mailto:alamsyahripqi@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    showAlert('Email client Anda akan terbuka. Silakan kirim email dari aplikasi email Anda.', 'info');
    document.getElementById('contactForm').reset();
}

// Method 3: Server-side integration (requires backend)
async function sendEmailWithServer(formData) {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showAlert('Pesan Anda telah terkirim! Terima kasih.', 'success');
            document.getElementById('contactForm').reset();
        } else {
            throw new Error(result.message || 'Gagal mengirim email');
        }
    } catch (error) {
        console.error('Server Error:', error);
        throw error;
    }
}

// Enhanced alert function with different types
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert-${type}`;
    alertDiv.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${getAlertIcon(type)}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 5000);
}

// Get icon for alert type
function getAlertIcon(type) {
    const icons = {
        success: '✓',
        error: '⚠',
        info: 'ℹ',
        warning: '⚡'
    };
    return icons[type] || icons.info;
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
