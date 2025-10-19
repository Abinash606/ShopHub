import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight, Lock, Heart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: 199.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
            color: 'Black',
            size: 'M',
            inStock: true
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 199.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
            color: 'Silver',
            size: 'One Size',
            inStock: true
        },
        {
            id: 3,
            name: 'Bluetooth Speaker',
            price: 59.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
            color: 'Blue',
            size: 'Standard',
            inStock: true
        }
    ]);

    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);

    const updateQuantity = (id, type) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                if (type === 'increment') {
                    return { ...item, quantity: item.quantity + 1 };
                } else if (type === 'decrement' && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const applyPromoCode = () => {
        if (promoCode.toUpperCase() === 'SAVE20') {
            setAppliedPromo({ code: 'SAVE20', discount: 20 });
            alert('Promo code applied! 20% discount added.');
        } else {
            alert('Invalid promo code');
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = (subtotal - discount) * 0.08;
    const total = subtotal - discount + shipping + tax;

    const recommendedProducts = [
        { id: 5, name: 'Phone Case', price: 24.99, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&h=200&fit=crop' },
        { id: 6, name: 'USB-C Cable', price: 14.99, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&h=200&fit=crop' },
        { id: 7, name: 'Wireless Mouse', price: 34.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <ShoppingCart className="w-8 h-8 text-blue-600" />
                            <span className="ml-2 text-2xl font-bold text-gray-900">ShopHub</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span href="#" className="text-gray-600 hover:text-blue-600" onClick={() => navigate('/')}>Continue Shopping</span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                                <p className="text-gray-600 mb-6">Add some products to get started!</p>
                                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 md:p-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full sm:w-32 h-32 object-cover rounded-lg"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                                                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                                        <span>Color: <span className="font-medium">{item.color}</span></span>
                                                        <span>Size: <span className="font-medium">{item.size}</span></span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 hover:bg-red-50 rounded-full transition"
                                                >
                                                    <Trash2 className="w-5 h-5 text-red-500" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-2 mb-4">
                                                <div className={`w-2 h-2 rounded-full ${item.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                <span className={`text-sm font-medium ${item.inStock ? 'text-green-700' : 'text-red-700'}`}>
                                                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </div>

                                            {/* Price and Quantity */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                {/* Quantity Selector */}
                                                <div className="flex items-center border-2 border-gray-300 rounded-lg w-fit">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 'decrement')}
                                                        className="p-2 hover:bg-gray-100 transition"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="px-4 font-semibold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 'increment')}
                                                        className="p-2 hover:bg-gray-100 transition"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                                                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 mt-4">
                                                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition">
                                                    <Heart className="w-4 h-4" />
                                                    Move to Wishlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Recommended Products */}
                        {cartItems.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">You might also like</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {recommendedProducts.map((product) => (
                                        <div key={product.id} className="group cursor-pointer">
                                            <div className="bg-gray-100 rounded-lg overflow-hidden mb-2">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-24 object-cover group-hover:scale-110 transition duration-300"
                                                />
                                            </div>
                                            <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</p>
                                            <p className="text-sm font-bold text-blue-600">${product.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                            {/* Promo Code */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Promo Code
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter code"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={applyPromoCode}
                                        className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {appliedPromo && (
                                    <div className="mt-2 flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg">
                                        <span className="text-sm text-green-700 font-medium">{appliedPromo.code} applied!</span>
                                        <button onClick={() => setAppliedPromo(null)}>
                                            <X className="w-4 h-4 text-green-700" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                {appliedPromo && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount ({appliedPromo.discount}%)</span>
                                        <span className="font-medium">-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium">
                                        {shipping === 0 ? (
                                            <span className="text-green-600">FREE</span>
                                        ) : (
                                            `$${shipping.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (8%)</span>
                                    <span className="font-medium">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-semibold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
                            </div>

                            {/* Free Shipping Banner */}
                            {subtotal < 50 && (
                                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-blue-700">
                                        Add <span className="font-bold">${(50 - subtotal).toFixed(2)}</span> more to get FREE shipping!
                                    </p>
                                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{ width: `${(subtotal / 50) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Checkout Button */}
                            <button
                                disabled={cartItems.length === 0}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {/* Security Badge */}
                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                                <Lock className="w-4 h-4" />
                                <span>Secure Checkout</span>
                            </div>

                            {/* Payment Methods */}
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-sm text-gray-600 text-center mb-3">We accept</p>
                                <div className="flex justify-center gap-3">
                                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">VISA</div>
                                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">MC</div>
                                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">AMEX</div>
                                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs font-bold">PP</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;