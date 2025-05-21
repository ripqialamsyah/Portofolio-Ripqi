// Product Data
const products = [
    {
        id: 1,
        name: "Hijab Segi Empat Premium",
        category: "segi-empat",
        price: 85000,
        originalPrice: 100000,
        image: "assets/segiempat premium.jpeg",
        rating: 4.8,
        reviews: 156,
        badge: "Terlaris",
        description: "Hijab segi empat premium dengan bahan voal import yang lembut dan adem"
    },
    {
        id: 2,
        name: "Pashmina Ceruti Babydoll",
        category: "pashmina",
        price: 120000,
        originalPrice: 150000,
        image: "assets/pashmina ceruti.jpeg",
        rating: 4.9,
        reviews: 89,
        badge: "Best Seller",
        description: "Pashmina ceruti dengan ukuran jumbo, cocok untuk acara formal"
    },
    {
        id: 3,
        name: "Hijab Instan Tali",
        category: "instan",
        price: 75000,
        originalPrice: 90000,
        image: "assets/hijab instan tali.jpeg",
        rating: 4.7,
        reviews: 203,
        badge: "Sale",
        description: "Hijab instan praktis dengan tali samping, cocok untuk aktivitas sehari-hari"
    },
    {
        id: 4,
        name: "Hijab Sport Breathable",
        category: "sport",
        price: 95000,
        originalPrice: 110000,
        image: "assets/hijab sport.jpg",
        rating: 4.6,
        reviews: 67,
        badge: "New",
        description: "Hijab khusus olahraga dengan teknologi breathable dan quick dry"
    },
    {
        id: 5,
        name: "Hijab Segi Empat Motif",
        category: "segi-empat",
        price: 65000,
        originalPrice: 80000,
        image: "assets/segiempat motif.jpeg",
        rating: 4.5,
        reviews: 134,
        badge: "",
        description: "Hijab segi empat dengan motif cantik dan warna-warna trending"
    },
    {
        id: 6,
        name: "Pashmina Silk Premium",
        category: "pashmina",
        price: 180000,
        originalPrice: 220000,
        image: "assets/pashmina silk.jpeg",
        rating: 5.0,
        reviews: 45,
        badge: "Premium",
        description: "Pashmina sutra premium dengan kualitas export dan kemewahan maksimal"
    }
];

// Global Variables
let cart = [];
let currentTestimonial = 0;
const testimonialCount = 3;

// DOM Elements
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const searchToggle = document.getElementById('search-toggle');
const searchBar = document.getElementById('search-bar');
const searchClose = document.getElementById('search-close');
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const scrollTop = document.getElementById('scroll-top');
const toast = document.getElementById('toast');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after 2 seconds
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    // Initialize components
    initNavigation();
    initHeader();
    initProducts();
    initAnimations();
    initTestimonials();
    initNewsletter();
    initCart();
    animateStats();
});

// Navigation Functions
function initNavigation() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
            navMenu.classList.remove('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Search functionality
    searchToggle.addEventListener('click', () => {
        searchBar.classList.add('active');
    });

    searchClose.addEventListener('click', () => {
        searchBar.classList.remove('active');
    });

    // Close search when clicking outside
    searchBar.addEventListener('click', (e) => {
        if (e.target === searchBar) {
            searchBar.classList.remove('active');
        }
    });
}

// Header scroll effect
function initHeader() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            scrollTop.classList.remove('show');
        }
    });

    // Scroll to top functionality
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Products Functions
function initProducts() {
    renderProducts(products);
    initProductFilters();
}

function renderProducts(productsToRender) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'product-card fade-in';
    div.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <button class="product-favorite" onclick="toggleFavorite(${product.id})">
                <i class="far fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">(${product.reviews} ulasan)</span>
            </div>
            <div class="product-price">
                <span class="price-current">Rp ${product.price.toLocaleString('id-ID')}</span>
                ${product.originalPrice ? `<span class="price-original">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="btn-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i>
                    Tambah ke Keranjang
                </button>
                <button class="btn-quick-view" onclick="quickView(${product.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    return div;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter products
            const filter = btn.getAttribute('data-filter');
            let filteredProducts = products;
            
            if (filter !== 'all') {
                filteredProducts = products.filter(product => product.category === filter);
            }
            
            renderProducts(filteredProducts);
            triggerFadeInAnimations();
        });
    });
}

// Animation Functions
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function triggerFadeInAnimations() {
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current).toLocaleString('id-ID');
        
        if (current >= end) {
            element.textContent = end.toLocaleString('id-ID');
            clearInterval(timer);
        }
    }, 16);
}

// Testimonials Functions
function initTestimonials() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.addEventListener('click', () => {
        currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : testimonialCount - 1;
        updateTestimonialSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = currentTestimonial < testimonialCount - 1 ? currentTestimonial + 1 : 0;
        updateTestimonialSlider();
    });
    
    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = currentTestimonial < testimonialCount - 1 ? currentTestimonial + 1 : 0;
        updateTestimonialSlider();
    }, 5000);
}

function updateTestimonialSlider() {
    const track = document.getElementById('testimonial-track');
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
}

// Newsletter Function
function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (email) {
            showToast('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
            form.reset();
        } else {
            showToast('Mohon masukkan email yang valid.', 'error');
        }
    });
}

// Cart Functions
function initCart() {
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    cartClose.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showToast(`${product.name} berhasil ditambahkan ke keranjang!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showToast('Produk berhasil dihapus dari keranjang!', 'success');
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartBadge = document.getElementById('cart-badge');
    const cartBody = document.getElementById('cart-body');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    // Clear cart body
    cartBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartBody.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Keranjang belanja Anda kosong</p>';
        cartTotal.style.display = 'none';
        return;
    }
    
    // Render cart items
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartBody.appendChild(cartItem);
    });
    
    // Calculate and display totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 15000;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
    
    cartTotal.style.display = 'block';
}

function createCartItem(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
            <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem;">
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 50%; cursor: pointer;">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 50%; cursor: pointer;">+</button>
                <button onclick="removeFromCart(${item.id})" style="margin-left: auto; background: none; border: none; color: #f44336; cursor: pointer;"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
    return div;
}

// Favorite Functions
let favorites = [];

function toggleFavorite(productId) {
    const button = event.target.closest('.product-favorite');
    const icon = button.querySelector('i');
    
    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
        icon.className = 'far fa-heart';
        button.classList.remove('active');
        showToast('Produk dihapus dari favorit!', 'success');
    } else {
        favorites.push(productId);
        icon.className = 'fas fa-heart';
        button.classList.add('active');
        showToast('Produk ditambahkan ke favorit!', 'success');
    }
}

// Quick View Function
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('quick-view-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 10px;">
            </div>
            <div>
                <h2 style="margin-bottom: 1rem; color: var(--accent-color);">${product.name}</h2>
                <div class="product-rating" style="margin-bottom: 1rem;">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-text">(${product.reviews} ulasan)</span>
                </div>
                <div class="product-price" style="margin-bottom: 1.5rem;">
                    <span class="price-current">Rp ${product.price.toLocaleString('id-ID')}</span>
                    ${product.originalPrice ? `<span class="price-original">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>` : ''}
                </div>
                <p style="margin-bottom: 2rem; color: #666; line-height: 1.6;">${product.description}</p>
                <div style="display: flex; gap: 1rem;">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal();" style="flex: 1;">
                        <i class="fas fa-cart-plus"></i>
                        Tambah ke Keranjang
                    </button>
                    <button onclick="toggleFavorite(${product.id})" style="padding: 1rem; border: 2px solid var(--primary-color); background: white; color: var(--primary-color); border-radius: 10px; cursor: pointer;">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Close modal functionality
    const modalClose = document.getElementById('modal-close');
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('quick-view-modal');
    modal.classList.remove('active');
}

// Search Function
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        
        displaySearchResults(filteredProducts);
    });
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p style="padding: 1rem; text-align: center; color: #666;">Produk tidak ditemukan</p>';
        return;
    }
    
    searchResults.innerHTML = results.slice(0, 5).map(product => `
        <div style="padding: 1rem; border-bottom: 1px solid #eee; cursor: pointer; display: flex; align-items: center; gap: 1rem;" onclick="selectSearchResult(${product.id})">
            <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
            <div>
                <div style="font-weight: 600; margin-bottom: 0.25rem;">${product.name}</div>
                <div style="color: var(--primary-color); font-weight: 600;">Rp ${product.price.toLocaleString('id-ID')}</div>
            </div>
        </div>
    `).join('');
}

function selectSearchResult(productId) {
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.remove('active');
    
    // Scroll to products section and highlight the product
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    
    // You could add highlighting logic here
    setTimeout(() => {
        quickView(productId);
    }, 1000);
}

// Toast Notification Function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Additional utility functions

// Format currency
function formatCurrency(amount) {
    return `Rp ${amount.toLocaleString('id-ID')}`;
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    
    // Initialize all animations observer
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[class*="animate"]').forEach(el => {
        animationObserver.observe(el);
    });
});

// Performance optimization - Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        scrollTop.classList.add('show');
    } else {
        header.classList.remove('scrolled');
        scrollTop.classList.remove('show');
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Update any layout-dependent elements here
    console.log('Window resized');
}, 250));