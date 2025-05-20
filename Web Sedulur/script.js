// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu') && !event.target.closest('.nav-links')) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .destination-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.feature-card, .destination-card, .testimonial-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Nama tidak boleh kosong');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email tidak boleh kosong');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Format email tidak valid');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (phoneInput.value.trim() === '') {
                showError(phoneInput, 'Nomor telepon tidak boleh kosong');
                isValid = false;
            } else {
                removeError(phoneInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Pesan tidak boleh kosong');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, simulate form submission
            if (isValid) {
                // Normally you would submit to a server here
                // For demo purposes, we'll just show a success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle" style="color: #4CAF50; font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3>Terima Kasih!</h3>
                        <p>Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.</p>
                    </div>
                `;
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        // Remove any existing error
        removeError(input);
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.innerText = message;
        
        // Highlight input
        input.style.borderColor = 'red';
        
        // Insert error after input
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    
    function removeError(input) {
        // Reset input style
        input.style.borderColor = '#ddd';
        
        // Remove error message if exists
        const parent = input.parentNode;
        const errorDiv = parent.querySelector('.error-message');
        if (errorDiv) {
            parent.removeChild(errorDiv);
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Destination card hover effect enhancement
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'transform 0.3s, box-shadow 0.3s';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Testimonial slider (if multiple testimonials)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    // Only set up slider if there's more than one testimonial
    if (testimonialCards.length > 1) {
        // Hide all testimonials except the first one
        for (let i = 1; i < testimonialCards.length; i++) {
            testimonialCards[i].style.display = 'none';
        }
        
        // Create slider controls
        const sliderControls = document.createElement('div');
        sliderControls.className = 'slider-controls';
        sliderControls.style.display = 'flex';
        sliderControls.style.justifyContent = 'center';
        sliderControls.style.marginTop = '2rem';
        
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.className = 'btn';
        prevBtn.style.marginRight = '1rem';
        
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.className = 'btn';
        
        sliderControls.appendChild(prevBtn);
        sliderControls.appendChild(nextBtn);
        
        // Add controls to container
        const testimonialContainer = document.querySelector('.testimonials-container');
        testimonialContainer.appendChild(sliderControls);
        
        // Add functionality to buttons
        prevBtn.addEventListener('click', function() {
            showTestimonial(currentTestimonial - 1);
        });
        
        nextBtn.addEventListener('click', function() {
            showTestimonial(currentTestimonial + 1);
        });
        
        function showTestimonial(index) {
            // Hide current testimonial
            testimonialCards[currentTestimonial].style.display = 'none';
            
            // Update index with wrap-around
            if (index < 0) {
                currentTestimonial = testimonialCards.length - 1;
            } else if (index >= testimonialCards.length) {
                currentTestimonial = 0;
            } else {
                currentTestimonial = index;
            }
            
            // Show new testimonial
            testimonialCards[currentTestimonial].style.display = 'block';
        }
        
        // Auto slide every 5 seconds
        setInterval(function() {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    }
});