import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, clearCart, loading } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      toast.error(error.message || 'Failed to update cart item');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error.message || 'Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
        toast.success('Cart cleared');
      } catch (error) {
        toast.error(error.message || 'Failed to clear cart');
      }
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed to checkout');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const subtotal = cart?.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start adding some items to your cart!
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white shadow-sm rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Cart Items ({cart.items.length})
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-red-600 hover:text-red-500"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <div key={item._id} className="px-6 py-6">
                      <div className="flex items-center">
                        <img
                          src={item.image || '/placeholder-product.jpg'}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        
                        <div className="ml-6 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                <Link
                                  to={`/products/${item.product}`}
                                  className="hover:text-indigo-600"
                                >
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-500">
                                ${item.price} each
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                  className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-2 py-1 rounded-l-md"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="bg-gray-100 px-4 py-1 text-center min-w-[3rem]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                  className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-2 py-1 rounded-r-md"
                                >
                                  +
                                </button>
                              </div>
                              
                              {/* Item Total */}
                              <div className="text-lg font-medium text-gray-900 min-w-[4rem] text-right">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              
                              {/* Remove Button */}
                              <button
                                onClick={() => handleRemoveItem(item._id)}
                                className="text-red-600 hover:text-red-500"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  {shipping === 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <p className="text-sm text-green-700">
                        🎉 You qualify for free shipping!
                      </p>
                    </div>
                  )}
                  
                  {subtotal > 0 && subtotal < 100 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <p className="text-sm text-blue-700">
                        Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping!
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  Proceed to Checkout
                </button>

                {/* Security Features */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">We accept</p>
                  <div className="flex justify-center space-x-2">
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs font-medium">VISA</div>
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs font-medium">MC</div>
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs font-medium">AMEX</div>
                    <div className="bg-gray-100 rounded px-2 py-1 text-xs font-medium">PayPal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
