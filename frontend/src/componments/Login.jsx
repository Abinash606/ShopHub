import React, { useState } from 'react';
import { ShoppingCart, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: formData.email,
                password: formData.password
            });
            if (response.status === 200) {
                toast.success('Login successful!', { position: 'top-right', autoClose: 3000 });
                console.log('Login response:', response.data);

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message || 'Login failed!';
                toast.error(message, { position: 'top-center' });
                console.error('Login error:', error.response.data);
            } else {
                toast.error('Unable to connect to the server.', { position: 'top-center' });
                console.error('Network error:', error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

                {/* Left Side - Login Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 order-2 lg:order-1">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center mb-8">
                        <ShoppingCart className="w-10 h-10 text-blue-600" />
                        <span className="ml-2 text-2xl font-bold text-gray-900">ShopHub</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-600">Sign in to your account to continue shopping</p>
                    </div>

                    <div className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Google</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Facebook</span>
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-600 mt-6">
                            Don't have an account?{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Side - Branding */}
                <div className="order-1 lg:order-2">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-white h-full flex flex-col justify-center">
                        <div className="flex items-center mb-8">
                            <ShoppingCart className="w-12 h-12" />
                            <span className="ml-3 text-3xl font-bold">ShopHub</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Start Your Shopping Journey</h2>
                        <p className="text-blue-100 text-lg mb-8">
                            Access your personalized dashboard, track orders, and enjoy exclusive member benefits.
                        </p>

                        {/* Features */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Track Your Orders</h3>
                                    <p className="text-blue-100 text-sm">Real-time updates on all your purchases</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">💳</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Saved Payment Methods</h3>
                                    <p className="text-blue-100 text-sm">Quick checkout with secure saved cards</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">❤️</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Wishlist & Favorites</h3>
                                    <p className="text-blue-100 text-sm">Save items for later and get price alerts</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🎯</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Personalized Deals</h3>
                                    <p className="text-blue-100 text-sm">Exclusive offers based on your preferences</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/20">
                            <div className="text-center">
                                <div className="text-3xl font-bold">50K+</div>
                                <div className="text-blue-100 text-sm">Products</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">100K+</div>
                                <div className="text-blue-100 text-sm">Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">4.8★</div>
                                <div className="text-blue-100 text-sm">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;