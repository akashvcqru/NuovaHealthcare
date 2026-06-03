"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { 
  ChevronRight, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  ShieldCheck, 
  Truck,
  ArrowRight
} from "lucide-react";
import { Address } from "@/types";

export default function CheckoutPage() {
  const { 
    cart, 
    user, 
    placeOrder, 
    getCartSubtotal, 
    getDiscountAmount, 
    getShippingFee, 
    getTaxAmount, 
    getCartTotal 
  } = useShop();

  // Selected address state
  const [selectedAddressId, setSelectedAddressId] = useState(
    user?.addresses.find((a) => a.isDefault)?.id || user?.addresses[0]?.id || ""
  );

  // Address form toggle for new addresses
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddressLine, setNewAddressLine] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZipCode, setNewZipCode] = useState("");

  // Payment Method state
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState("4111 2222 3333 4444");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");
  const [upiId, setUpiId] = useState("admin@okhdfc");

  // Success view
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Sync selected address if user is loaded
  useEffect(() => {
    if (user && !selectedAddressId) {
      setSelectedAddressId(user.addresses.find((a) => a.isDefault)?.id || user.addresses[0]?.id || "");
    }
  }, [user, selectedAddressId]);

  // Handle Placing Order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    let shippingAddress: Address | undefined;
    
    if (showNewAddressForm) {
      if (!newFullName || !newPhone || !newAddressLine || !newCity || !newState || !newZipCode) {
        alert("Please fill in all address fields.");
        return;
      }
      shippingAddress = {
        id: `addr-temp-${Date.now()}`,
        fullName: newFullName,
        phone: newPhone,
        addressLine: newAddressLine,
        city: newCity,
        state: newState,
        zipCode: newZipCode,
        isDefault: false
      };
    } else {
      shippingAddress = user?.addresses.find((a) => a.id === selectedAddressId);
    }

    if (!shippingAddress) {
      alert("Please select or add a shipping address.");
      return;
    }

    const order = placeOrder(shippingAddress, paymentMethod);
    setCreatedOrder(order);
  };

  const handleAddNewAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowNewAddressForm(true);
  };

  const subtotal = getCartSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const tax = getTaxAmount();
  const total = getCartTotal();

  if (!mounted) {
    return (
      <div className="bg-brand-light min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If order was successfully created, render the premium success receipt
  if (createdOrder) {
    return (
      <div className="bg-brand-light min-h-screen py-16 px-4">
        <div className="max-w-xl mx-auto bg-white border border-gray-100 p-8 rounded-[28px] shadow-premium flex flex-col items-center text-center gap-6 animate-scale-in">
          <div className="w-20 h-20 bg-brand-accent/15 border border-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent text-3xl shadow-sm">
            ✓
          </div>
          
          <div className="flex flex-col gap-2">
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-brand-primary">
              Order Placed Successfully!
            </h1>
            <p className="text-sm text-gray-500">
              Thank you for shopping at VetPet Galleria. Your pet's wellness package is being compiled.
            </p>
          </div>

          <div className="w-full bg-brand-light p-4 rounded-2xl text-xs flex flex-col gap-3 text-left">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400 font-bold uppercase">Order ID</span>
              <strong className="text-brand-primary font-mono text-sm">{createdOrder.id}</strong>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400 font-bold uppercase">Estimated Delivery</span>
              <strong className="text-brand-primary flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-brand-secondary" />
                2 - 3 Business Days
              </strong>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400 font-bold uppercase">Payment Mode</span>
              <strong className="text-brand-primary uppercase font-bold">{createdOrder.paymentMethod}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-bold uppercase">Total Charged</span>
              <strong className="text-brand-primary text-sm">₹{createdOrder.total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2.5">
            <Link
              href="/profile"
              className="w-full bg-brand-primary text-white font-bold text-xs py-3.5 rounded-xl hover:bg-brand-primary-hover shadow-md transition-all text-center"
            >
              Track Order in Profile
            </Link>
            <Link
              href="/products"
              className="w-full bg-transparent border border-gray-200 text-brand-primary font-bold text-xs py-3.5 rounded-xl hover:bg-brand-light transition-all text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="bg-brand-light min-h-[60vh] flex flex-col items-center justify-center p-8 text-center gap-4">
        <h1 className="font-heading font-bold text-2xl text-brand-primary">Nothing to checkout</h1>
        <p className="text-xs text-gray-500">Your shopping cart is currently empty.</p>
        <Link href="/products" className="bg-brand-primary text-white text-xs px-6 py-3 rounded-full font-bold">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-light min-h-screen pb-16 md:pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-505 font-semibold uppercase tracking-wider">
          <Link href="/cart" className="hover:text-brand-secondary transition-colors">Cart</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-brand-primary">Checkout Form</span>
        </div>
      </div>

      <form 
        onSubmit={handlePlaceOrder}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        
        {/* Left Column: Shipping & Payment details */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Shipping Address Selection */}
          <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col gap-5">
            <h2 className="font-heading font-bold text-xl text-brand-primary border-b border-gray-100 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-secondary" />
              Shipping Address
            </h2>

            {/* Address Selection */}
            {user && user.addresses.length > 0 && !showNewAddressForm && (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <label 
                      key={addr.id}
                      className={`border rounded-2xl p-4 flex gap-3 items-start cursor-pointer hover:bg-brand-light/50 transition-all ${
                        selectedAddressId === addr.id 
                          ? "border-brand-secondary bg-brand-secondary/5" 
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingAddress"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mt-1 accent-brand-secondary cursor-pointer"
                      />
                      <div className="flex flex-col text-xs text-gray-500 gap-1">
                        <strong className="text-brand-primary text-sm font-semibold">{addr.fullName}</strong>
                        <span>{addr.addressLine}</span>
                        <span>{addr.city}, {addr.state} {addr.zipCode}</span>
                        <span>Phone: {addr.phone}</span>
                        {addr.isDefault && (
                          <span className="bg-brand-accent/15 text-brand-accent text-[9px] font-bold px-1.5 py-0.5 rounded w-fit mt-1 border border-brand-accent/10">
                            DEFAULT
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleAddNewAddress}
                  className="text-xs font-bold text-brand-secondary hover:text-brand-secondary-hover underline self-start mt-2"
                >
                  + Ship to a new address
                </button>
              </div>
            )}

            {/* New Address Input Form */}
            {(showNewAddressForm || !user || user.addresses.length === 0) && (
              <div className="flex flex-col gap-4 animate-fade-in-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-primary uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                      placeholder="e.g. Aditya Sharma"
                      className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-primary uppercase">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-brand-primary uppercase">Street Address</label>
                  <input
                    type="text"
                    required
                    value={newAddressLine}
                    onChange={(e) => setNewAddressLine(e.target.value)}
                    placeholder="e.g. 12, MG Road, Indiranagar"
                    className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-secondary"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-primary uppercase">City</label>
                    <input
                      type="text"
                      required
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="Bengaluru"
                      className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-primary uppercase">State</label>
                    <input
                      type="text"
                      required
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                      placeholder="Karnataka"
                      className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-primary uppercase">Pin Code</label>
                    <input
                      type="text"
                      required
                      value={newZipCode}
                      onChange={(e) => setNewZipCode(e.target.value)}
                      placeholder="560008"
                      className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                </div>

                {user && user.addresses.length > 0 && (
                  <button
                    onClick={(e) => { e.preventDefault(); setShowNewAddressForm(false); }}
                    className="text-xs font-bold text-gray-400 hover:text-brand-primary self-start mt-2"
                  >
                    ← Select from saved address book
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col gap-5">
            <h2 className="font-heading font-bold text-xl text-brand-primary border-b border-gray-100 pb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-secondary" />
              Payment Method
            </h2>

            <div className="flex flex-col gap-4">
              {/* Credit Card radio Option */}
              <label 
                className={`border rounded-2xl p-4 flex gap-3 items-start cursor-pointer hover:bg-brand-light/50 transition-all ${
                  paymentMethod === "credit-card" 
                    ? "border-brand-secondary bg-brand-secondary/5" 
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === "credit-card"}
                  onChange={() => setPaymentMethod("credit-card")}
                  className="mt-1 accent-brand-secondary cursor-pointer"
                />
                <div className="flex flex-col gap-1 w-full text-xs">
                  <strong className="text-brand-primary text-sm font-semibold">Pay with Credit/Debit Card</strong>
                  <span className="text-gray-400">Secure 256-bit encrypted card processing.</span>
                  
                  {paymentMethod === "credit-card" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 bg-white border border-gray-100 p-4 rounded-xl animate-fade-in-up">
                      <div className="sm:col-span-3 flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-brand-primary uppercase">Card Number</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="bg-brand-light border border-gray-200 rounded-lg p-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-brand-primary uppercase">Expiration Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="bg-brand-light border border-gray-200 rounded-lg p-2 text-xs focus:outline-none text-center"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-brand-primary uppercase">CVV Security Code</label>
                        <input
                          type="text"
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="bg-brand-light border border-gray-200 rounded-lg p-2 text-xs focus:outline-none text-center"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* UPI Option */}
              <label 
                className={`border rounded-2xl p-4 flex gap-3 items-start cursor-pointer hover:bg-brand-light/50 transition-all ${
                  paymentMethod === "upi" 
                    ? "border-brand-secondary bg-brand-secondary/5" 
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                  className="mt-1 accent-brand-secondary cursor-pointer"
                />
                <div className="flex flex-col gap-1 w-full text-xs">
                  <strong className="text-brand-primary text-sm font-semibold">UPI Payment (GPay / PhonePe / Paytm)</strong>
                  <span className="text-gray-400">Scan QR code or use your UPI ID for instant and secure bank transfer.</span>

                  {paymentMethod === "upi" && (
                    <div className="flex flex-col gap-3 mt-4 bg-white border border-gray-100 p-4 rounded-xl animate-fade-in-up">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-brand-primary uppercase">UPI ID</label>
                        <input
                          type="text"
                          required
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. aditya@okhdfc"
                          className="bg-brand-light border border-gray-200 rounded-lg p-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-4 p-2 border border-dashed border-gray-200 rounded-lg">
                        <div className="w-16 h-16 bg-brand-light border border-gray-200 rounded-lg flex flex-col items-center justify-center text-brand-primary p-1 flex-shrink-0">
                          <div className="grid grid-cols-3 gap-1 w-8 h-8 opacity-75">
                            <div className="bg-brand-primary rounded-sm"></div>
                            <div className="bg-brand-primary rounded-sm"></div>
                            <div className="bg-transparent"></div>
                            <div className="bg-brand-primary rounded-sm"></div>
                            <div className="bg-transparent"></div>
                            <div className="bg-brand-primary rounded-sm"></div>
                            <div className="bg-brand-primary rounded-sm"></div>
                            <div className="bg-brand-primary rounded-sm"></div>
                            <div className="bg-brand-primary rounded-sm"></div>
                          </div>
                          <span className="text-[7px] font-bold mt-1 uppercase text-gray-400">Scan QR</span>
                        </div>
                        <div className="flex flex-col gap-0.5 text-[10px] text-gray-500 text-left">
                          <strong className="text-brand-primary font-bold">Simulated UPI Transfer</strong>
                          <span>You can scan or insert your UPI ID to trigger mock completion.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

        </section>

        {/* Right Column: Checkout Order Summary list */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col gap-6">
            <h3 className="font-heading font-bold text-base text-brand-primary border-b border-gray-100 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-brand-secondary" />
              Order Review
            </h3>

            {/* Cart Items listing summary */}
            <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 max-h-48 overflow-y-auto no-scrollbar">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between items-center gap-3 text-xs text-gray-505">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-brand-light text-brand-primary w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]">
                      {item.quantity}x
                    </span>
                    <span className="font-semibold text-brand-primary line-clamp-1">{item.product.name}</span>
                  </div>
                  <strong className="text-brand-primary font-bold">₹{(item.product.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-3 text-sm text-gray-600 border-b border-gray-100 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-brand-primary">₹{subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-brand-accent">
                  <span>Coupon Discount</span>
                  <span className="font-bold">-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-bold text-brand-primary">
                  {shipping === 0 ? <strong className="text-brand-accent">Free</strong> : `₹${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="font-bold text-brand-primary">₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline font-heading font-extrabold text-xl text-brand-primary">
              <span>Grand Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {/* Place Order Submit Button */}
            <button
              type="submit"
              className="bg-brand-primary text-white font-bold text-sm py-4 rounded-xl hover:bg-brand-primary-hover shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2"
            >
              <span>Place Secure Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 justify-center text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>FDA approved pet health safety</span>
            </div>
          </div>
        </aside>

      </form>
    </div>
  );
}
