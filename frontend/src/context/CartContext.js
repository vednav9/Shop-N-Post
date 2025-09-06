import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CART: 'SET_CART',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  SET_ERROR: 'SET_ERROR'
};

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case CART_ACTIONS.SET_CART:
      const cartItems = action.payload || [];
      return {
        ...state,
        items: cartItems,
        itemCount: cartItems.reduce((total, item) => total + item.quantity, 0),
        total: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
        loading: false,
        error: null
      };

    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(item => item.product === action.payload.product);
      let updatedItems;
      
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.product === action.payload.product
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((total, item) => total + item.quantity, 0),
        total: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      };

    case CART_ACTIONS.UPDATE_ITEM:
      const itemsAfterUpdate = state.items.map(item =>
        item._id === action.payload.itemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      return {
        ...state,
        items: itemsAfterUpdate,
        itemCount: itemsAfterUpdate.reduce((total, item) => total + item.quantity, 0),
        total: itemsAfterUpdate.reduce((total, item) => total + (item.price * item.quantity), 0)
      };

    case CART_ACTIONS.REMOVE_ITEM:
      const itemsAfterRemoval = state.items.filter(item => item._id !== action.payload);

      return {
        ...state,
        items: itemsAfterRemoval,
        itemCount: itemsAfterRemoval.reduce((total, item) => total + item.quantity, 0),
        total: itemsAfterRemoval.reduce((total, item) => total + (item.price * item.quantity), 0)
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useContext(AuthContext);

  // Load cart on authentication change
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      // Load from localStorage for non-authenticated users
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      dispatch({ type: CART_ACTIONS.SET_CART, payload: localCart });
    }
  }, [user]);

  // Save to localStorage for non-authenticated users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, user]);

  const loadCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      const response = await api.get('/cart');
      dispatch({ type: CART_ACTIONS.SET_CART, payload: response.data.data?.items || [] });
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Failed to load cart' });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      if (user) {
        await api.post('/cart/add', { productId, quantity });
        await loadCart();
      } else {
        // For non-authenticated users, we need product details
        const productResponse = await api.get(`/products/${productId}`);
        const product = productResponse.data.data;
        
        const cartItem = {
          _id: `local_${productId}`,
          product: productId,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '',
          quantity
        };
        
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: cartItem });
      }

      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        return removeFromCart(itemId);
      }

      if (user) {
        await api.put('/cart/update', { itemId, quantity });
        await loadCart();
      } else {
        dispatch({ 
          type: CART_ACTIONS.UPDATE_ITEM, 
          payload: { itemId, quantity } 
        });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart item');
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (user) {
        await api.delete(`/cart/remove/${itemId}`);
        await loadCart();
      } else {
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
      }

      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        await api.delete('/cart/clear');
      }
      
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      localStorage.removeItem('cart');
      
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const getCartItemQuantity = (productId) => {
    const item = state.items.find(item => item.product === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return state.items.some(item => item.product === productId);
  };

  const value = {
    cart: state,
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    loading: state.loading,
    error: state.error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartItemQuantity,
    isInCart,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
