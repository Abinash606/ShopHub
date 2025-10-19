import React, { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X, Heart, Truck, Lock, RefreshCw, Star, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [cart, setCart] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const products = [
        { id: 1, name: 'Wireless Headphones', price: 79.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
        { id: 2, name: 'Smart Watch', price: 199.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
        { id: 3, name: 'Laptop Backpack', price: 49.99, rating: 4.3, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop' },
        { id: 4, name: 'Bluetooth Speaker', price: 59.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop' },
        { id: 5, name: 'Phone Case', price: 24.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop' },
        { id: 6, name: 'USB-C Cable', price: 14.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=300&fit=crop' },
        { id: 7, name: 'Wireless Mouse', price: 34.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop' },
        { id: 8, name: 'Keyboard', price: 89.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop' },
    ];

    const categories = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Books', 'Toys'];

    const addToCart = () => {
        setCart(cart + 1);
    };
    // Fetch products from Laravel API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/products');
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <ShoppingCart className="w-8 h-8 text-blue-600" />
                            <span className="ml-2 text-2xl font-bold text-gray-900">ShopHub</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-gray-900 hover:text-blue-600 font-medium">Home</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Products</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Deals</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                className="relative p-2 hover:bg-gray-100 rounded-full"
                                onClick={() => navigate('/cart')}
                            >
                                <ShoppingCart className="w-6 h-6 text-gray-700" />
                                {cart > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cart}
                                    </span>
                                )}
                            </button>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition" onClick={() => navigate('/signup')}>
                                Sign In
                            </button>
                        </div>

                        <button
                            className="md:hidden p-2"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {menuOpen && (
                        <div className="md:hidden pb-4">
                            <a href="#" className="block py-2 text-gray-900 hover:text-blue-600 font-medium">Home</a>
                            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Products</a>
                            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Deals</a>
                            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Contact</a>
                            <button className="w-full mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                Sign In
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Welcome to ShopHub
                            </h1>
                            <p className="text-lg md:text-xl mb-8 text-blue-100">
                                Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, and more!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                                    Shop Now
                                </button>
                                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                                    View Deals
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:flex justify-center">
                            <ShoppingCart className="w-64 h-64 opacity-20" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center"
                        >
                            <div className="text-sm font-medium text-gray-900">{category}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
                        <p className="text-gray-600">On orders over $50</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
                        <p className="text-gray-600">100% secure transactions</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
                        <p className="text-gray-600">30-day return policy</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                                />
                                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition">
                                    <Heart className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                                <div className="flex items-center mb-2">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                                    <button
                                        onClick={addToCart}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                    <p className="text-blue-100 mb-8">Get the latest updates on new products and exclusive offers!</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-6 py-3 rounded-lg text-gray-900 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <ShoppingCart className="w-8 h-8 text-blue-500" />
                                <span className="ml-2 text-xl font-bold">ShopHub</span>
                            </div>
                            <p className="text-gray-400">Your one-stop shop for everything you need.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Customer Service</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Track Order</a></li>
                                <li><a href="#" className="hover:text-white">Returns</a></li>
                                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                    <span className="text-lg">f</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                    <span className="text-lg">t</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                                    <span className="text-lg">in</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 ShopHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;