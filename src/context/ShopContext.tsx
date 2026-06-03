"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem, Address, Order } from "@/types";

function generateOrderId(): string {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
}

interface Coupon {
  code: string;
  discountType: "percentage" | "fixed" | "free-shipping";
  value: number;
  minSubtotal?: number;
  categoryLimit?: string; // e.g. 'healthcare'
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  recentlyViewed: Product[];
  coupon: Coupon | null;
  user: {
    name: string;
    email: string;
    addresses: Address[];
  } | null;
  orders: Order[];
  
  // Actions
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateCartQuantity: (productId: string, selectedSize: string | undefined, quantity: number) => void;
  clearCart: () => void;
  
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  addToRecentlyViewed: (product: Product) => void;
  
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  login: (email: string) => void;
  logout: () => void;
  
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  
  placeOrder: (shippingAddress: Address, paymentMethod: string) => Order;
  
  // Price Helpers
  getCartSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getTaxAmount: () => number;
  getCartTotal: () => number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const MOCK_COUPONS: Coupon[] = [
  { code: "WELCOME10", discountType: "percentage", value: 10 }, // 10% off site-wide
  { code: "PETCARE15", discountType: "percentage", value: 15, categoryLimit: "healthcare" }, // 15% off healthcare
  { code: "FREESHIP", discountType: "free-shipping", value: 0, minSubtotal: 2000 } // Free shipping on orders over ₹2000
];

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    fullName: "Admin",
    addressLine: "12, MG Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    zipCode: "560008",
    phone: "+91 98765 43210",
    isDefault: true
  }
];

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [user, setUser] = useState<{ name: string; email: string; addresses: Address[] } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Hydration guard to load from local storage safely on client mount
  useEffect(() => {
    const savedCart = localStorage.getItem("nuova_cart");
    const savedWishlist = localStorage.getItem("nuova_wishlist");
    const savedRecently = localStorage.getItem("nuova_recently_viewed");
    const savedUser = localStorage.getItem("nuova_user");
    const savedOrders = localStorage.getItem("nuova_orders");
    
    const handle = requestAnimationFrame(() => {
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedRecently) setRecentlyViewed(JSON.parse(savedRecently));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && (parsed.name === "Roshni Sen" || !parsed.name)) {
          parsed.name = "Admin";
          parsed.email = "admin@example.com";
          localStorage.setItem("nuova_user", JSON.stringify(parsed));
        }
        setUser(parsed);
      } else {
        // Setup a default mock user for demonstration purposes
        const defaultUser = {
          name: "Admin",
          email: "admin@example.com",
          addresses: DEFAULT_ADDRESSES
        };
        setUser(defaultUser);
        localStorage.setItem("nuova_user", JSON.stringify(defaultUser));
      }
    });

    return () => cancelAnimationFrame(handle);
  }, []);
  
  // Persist actions to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("nuova_cart", JSON.stringify(newCart));
  };
  
  const saveWishlist = (newWishlist: Product[]) => {
    setWishlist(newWishlist);
    localStorage.setItem("nuova_wishlist", JSON.stringify(newWishlist));
  };
  
  const saveRecentlyViewed = (newRecently: Product[]) => {
    setRecentlyViewed(newRecently);
    localStorage.setItem("nuova_recently_viewed", JSON.stringify(newRecently));
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem("nuova_orders", JSON.stringify(newOrders));
  };

  const saveUser = (newUser: typeof user) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("nuova_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("nuova_user");
    }
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === selectedSize
    );
    
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      saveCart(newCart);
    } else {
      saveCart([...cart, { product, quantity, selectedSize }]);
    }
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    const newCart = cart.filter(
      (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
    );
    saveCart(newCart);
  };

  const updateCartQuantity = (productId: string, selectedSize: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    
    const newCart = cart.map((item) => {
      if (item.product.id === productId && item.selectedSize === selectedSize) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
    setCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    const index = wishlist.findIndex((item) => item.id === product.id);
    if (index > -1) {
      const newWishlist = wishlist.filter((item) => item.id !== product.id);
      saveWishlist(newWishlist);
    } else {
      saveWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Recently Viewed operations
  const addToRecentlyViewed = (product: Product) => {
    const filtered = recentlyViewed.filter((item) => item.id !== product.id);
    const newRecently = [product, ...filtered].slice(0, 5); // cap at 5
    saveRecentlyViewed(newRecently);
  };

  // Coupon operations
  const applyCoupon = (code: string) => {
    const found = MOCK_COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase().trim());
    if (!found) {
      return { success: false, message: "Invalid coupon code." };
    }
    
    const subtotal = getCartSubtotal();
    if (found.minSubtotal && subtotal < found.minSubtotal) {
      return { success: false, message: `This coupon requires a minimum subtotal of ₹${found.minSubtotal}.` };
    }
    
    setCoupon(found);
    return { success: true, message: `Coupon "${found.code}" applied successfully!` };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  // Auth mock operations
  const login = (email: string) => {
    const loggedInUser = {
      name: "Admin",
      email: email,
      addresses: DEFAULT_ADDRESSES
    };
    saveUser(loggedInUser);
  };

  const logout = () => {
    saveUser(null);
    setOrders([]);
    localStorage.removeItem("nuova_orders");
  };

  // Address operations
  const addAddress = (address: Omit<Address, "id">) => {
    if (!user) return;
    const newId = `addr-${Date.now()}`;
    const newAddress: Address = { ...address, id: newId };
    
    let newAddresses = [...user.addresses];
    if (newAddress.isDefault) {
      newAddresses = newAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    newAddresses.push(newAddress);
    
    saveUser({ ...user, addresses: newAddresses });
  };

  const updateAddress = (address: Address) => {
    if (!user) return;
    let newAddresses = user.addresses.map((a) => (a.id === address.id ? address : a));
    if (address.isDefault) {
      newAddresses = newAddresses.map((a) => (a.id !== address.id ? { ...a, isDefault: false } : a));
    }
    saveUser({ ...user, addresses: newAddresses });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const newAddresses = user.addresses.filter((a) => a.id !== id);
    // If we deleted the default, set first one as default
    if (newAddresses.length > 0 && !newAddresses.some((a) => a.isDefault)) {
      newAddresses[0].isDefault = true;
    }
    saveUser({ ...user, addresses: newAddresses });
  };

  // Place Order operations
  const placeOrder = (shippingAddress: Address, paymentMethod: string) => {
    const subtotal = getCartSubtotal();
    const discount = getDiscountAmount();
    const shipping = getShippingFee();
    const tax = getTaxAmount();
    const total = getCartTotal();

    const newOrder: Order = {
      id: generateOrderId(),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      status: "Processing",
      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
        selectedSize: item.selectedSize
      })),
      subtotal,
      discount,
      shipping,
      tax,
      total,
      shippingAddress,
      paymentMethod,
      couponCode: coupon?.code
    };

    const newOrders = [newOrder, ...orders];
    saveOrders(newOrders);
    clearCart();
    return newOrder;
  };

  // Price Calculation Helpers
  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const getDiscountAmount = () => {
    if (!coupon) return 0;
    
    const subtotal = getCartSubtotal();
    if (coupon.discountType === "percentage") {
      if (coupon.categoryLimit) {
        // limit to a specific subcategory or tags (e.g. healthcare)
        const eligibleSubtotal = cart
          .filter((item) => {
            if (coupon.categoryLimit === "healthcare") {
              return item.product.isHealthcare;
            }
            return false;
          })
          .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        return parseFloat((eligibleSubtotal * (coupon.value / 100)).toFixed(2));
      }
      return parseFloat((subtotal * (coupon.value / 100)).toFixed(2));
    }
    
    if (coupon.discountType === "fixed") {
      return Math.min(coupon.value, subtotal);
    }
    
    return 0; // free-shipping is handled in shipping fee
  };

  const getShippingFee = () => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal >= 3000) return 0; // Free shipping threshold (₹3,000)
    if (coupon?.discountType === "free-shipping") return 0;
    return 150; // Standard shipping (₹150)
  };

  const getTaxAmount = () => {
    const taxableAmount = Math.max(0, getCartSubtotal() - getDiscountAmount());
    return parseFloat((taxableAmount * 0.18).toFixed(2)); // 18% GST
  };

  const getCartTotal = () => {
    const total = getCartSubtotal() - getDiscountAmount() + getShippingFee() + getTaxAmount();
    return parseFloat(Math.max(0, total).toFixed(2));
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        coupon,
        user,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToRecentlyViewed,
        applyCoupon,
        removeCoupon,
        login,
        logout,
        addAddress,
        updateAddress,
        deleteAddress,
        placeOrder,
        getCartSubtotal,
        getDiscountAmount,
        getShippingFee,
        getTaxAmount,
        getCartTotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
