<script>
    // Cart functionality
    const cart = {
        items: [],
        addItem(id, name, price, quantity = 1) {
            const existingItem = this.items.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({ id, name, price, quantity });
            }
            
            this.updateCart();
            this.saveCart();
            this.updateCartCount();
        },
        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.updateCart();
            this.saveCart();
            this.updateCartCount();
        },
        updateQuantity(id, quantity) {
            const item = this.items.find(item => item.id === id);
            if (item) {
                item.quantity = Math.max(1, quantity);
                this.updateCart();
                this.saveCart();
            }
        },
        getSubtotal() {
            return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        getShipping() {
            return this.items.length > 0 ? 20000 : 0;
        },
        getTax() {
            return this.getSubtotal() * 0.1;
        },
        getTotal() {
            return this.getSubtotal() + this.getShipping() + this.getTax();
        },
        updateCart() {
            const cartItemsEl = document.getElementById('cartItems');
            if (!cartItemsEl) return;
            
            if (this.items.length === 0) {
                cartItemsEl.innerHTML = '<p>Keranjang belanja Anda kosong.</p>';
            } else {
                cartItemsEl.innerHTML = this.items.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="item-image">
                            <img src="/api/placeholder/60/60" alt="${item.name}">
                        </div>
                        <div class="item-details">
                            <div class="item-title">${item.name}</div>
                            <div class="item-price">Rp ${this.formatPrice(item.price)}</div>
                            <div class="item-quantity">
                                <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                                <button class="remove-item" data-id="${item.id}">Hapus</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            
            // Update summary
            document.getElementById('subtotal').textContent = `Rp ${this.formatPrice(this.getSubtotal())}`;
            document.getElementById('shipping').textContent = `Rp ${this.formatPrice(this.getShipping())}`;
            document.getElementById('tax').textContent = `Rp ${this.formatPrice(this.getTax())}`;
            document.getElementById('total').textContent = `Rp ${this.formatPrice(this.getTotal())}`;
            
            // Add event listeners for cart item actions
            this.addCartItemEventListeners();
            
            // Update checkout form if it exists
            this.updateCheckoutSummary();
        },
        addCartItemEventListeners() {
            document.querySelectorAll('.decrease-quantity').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    const item = this.items.find(item => item.id === id);
                    if (item && item.quantity > 1) {
                        this.updateQuantity(id, item.quantity - 1);
                    }
                });
            });
            
            document.querySelectorAll('.increase-quantity').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    const item = this.items.find(item => item.id === id);
                    if (item) {
                        this.updateQuantity(id, item.quantity + 1);
                    }
                });
            });
            
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', () => {
                    const id = input.getAttribute('data-id');
                    const quantity = parseInt(input.value);
                    if (!isNaN(quantity) && quantity > 0) {
                        this.updateQuantity(id, quantity);
                    }
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    this.removeItem(id);
                });
            });
        },
        updateCheckoutSummary() {
            const orderItemsEl = document.getElementById('orderItems');
            if (!orderItemsEl) return;
            
            orderItemsEl.innerHTML = this.items.map(item => `
                <div class="order-item">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>Rp ${this.formatPrice(item.price * item.quantity)}</span>
                </div>
            `).join('');
            
            document.getElementById('checkoutSubtotal').textContent = `Rp ${this.formatPrice(this.getSubtotal())}`;
            document.getElementById('checkoutShipping').textContent = `Rp ${this.formatPrice(this.getShipping())}`;
            document.getElementById('checkoutTax').textContent = `Rp ${this.formatPrice(this.getTax())}`;
            document.getElementById('checkoutTotal').textContent = `Rp ${this.formatPrice(this.getTotal())}`;
        },
        formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.items));
        },
        loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.items = JSON.parse(savedCart);
                this.updateCartCount();
            }
        },
        updateCartCount() {
            const count = this.items.reduce((total, item) => total + item.quantity, 0);
            document.querySelector('.cart-count').textContent = count;
        },
        clearCart() {
            this.items = [];
            this.saveCart();
            this.updateCart();
            this.updateCartCount();
        }
    };

    // Load cart from localStorage when page loads
    document.addEventListener('DOMContentLoaded', () => {
        cart.loadCart();
        
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const name = button.getAttribute('data-name');
                const price = parseInt(button.getAttribute('data-price'));
                
                cart.addItem(id, name, price);
                showAlert('Produk berhasil ditambahkan ke keranjang!');
            });
        });
        
        // Cart icon
        document.getElementById('cartIcon').addEventListener('click', () => {
            document.getElementById('cartModal').style.display = 'flex';
            cart.updateCart();
        });
        
        // User icon for login
        document.getElementById('userIcon').addEventListener('click', () => {
            document.getElementById('loginModal').style.display = 'flex';
        });
        
        // Close modals
        document.getElementById('closeCartModal').addEventListener('click', () => {
            document.getElementById('cartModal').style.display = 'none';
        });
        
        document.getElementById('closeLoginModal').addEventListener('click', () => {
            document.getElementById('loginModal').style.display = 'none';
        });
        
        document.getElementById('closeCheckoutModal').addEventListener('click', () => {
            document.getElementById('checkoutModal').style.display = 'none';
        });
        
        // Continue shopping button
        document.getElementById('continueShopping').addEventListener('click', () => {
            document.getElementById('cartModal').style.display = 'none';
        });
        
        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            if (cart.items.length === 0) {
                showAlert('Keranjang belanja Anda kosong!');
                return;
            }
            
            document.getElementById('cartModal').style.display = 'none';
            document.getElementById('checkoutModal').style.display = 'flex';
            cart.updateCheckoutSummary();
        });
        
        // Checkout form submission
        document.getElementById('checkoutForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real application, you would handle the checkout process here
            // (sending data to server, processing payment, etc.)
            
            showAlert('Pesanan Anda berhasil diproses! Terima kasih telah berbelanja.');
            document.getElementById('checkoutModal').style.display = 'none';
            cart.clearCart();
        });
    });
</script>
