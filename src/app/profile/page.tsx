"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { 
  MapPin, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Edit, 
  ChevronRight, 
  LogOut, 
  Inbox, 
  Clock
} from "lucide-react";
import { Address } from "@/types";

export default function ProfilePage() {
  const { 
    user, 
    orders, 
    login, 
    logout, 
    addAddress, 
    updateAddress, 
    deleteAddress 
  } = useShop();

  const [activeTab, setActiveTab] = useState<"orders" | "addresses">("orders");
  
  // Auth Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("password123");

  // Address Form States
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  
  // Address Field States
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  // Order Details Modal or Expand states
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim()) {
      login(loginEmail.trim());
    }
  };

  const handleOpenNewAddress = () => {
    setEditingAddress(null);
    setFullName("");
    setPhone("");
    setAddressLine("");
    setCity("");
    setState("");
    setZipCode("");
    setIsDefault(false);
    setShowAddressForm(true);
  };

  const handleOpenEditAddress = (addr: Address) => {
    setEditingAddress(addr);
    setFullName(addr.fullName);
    setPhone(addr.phone);
    setAddressLine(addr.addressLine);
    setCity(addr.city);
    setState(addr.state);
    setZipCode(addr.zipCode);
    setIsDefault(addr.isDefault);
    setShowAddressForm(true);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !addressLine || !city || !state || !zipCode) {
      alert("All fields are required.");
      return;
    }

    const addrPayload = {
      fullName,
      phone,
      addressLine,
      city,
      state,
      zipCode,
      isDefault
    };

    if (editingAddress) {
      updateAddress({ ...addrPayload, id: editingAddress.id });
    } else {
      addAddress(addrPayload);
    }
    
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  if (!mounted) {
    return (
      <div className="bg-brand-light min-h-[75vh] flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is not logged in, show the mock sign-in form
  if (!user) {
    return (
      <div className="bg-brand-light min-h-[75vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white border border-gray-100 p-8 rounded-[28px] shadow-premium flex flex-col gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto text-brand-primary text-xl mb-3">
              🔑
            </div>
            <h1 className="font-heading font-bold text-2xl text-brand-primary">
              Sign In to Your Profile
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Access your order history, manage shipping directories, and track deliveries.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-primary uppercase">Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="e.g. roshni.sen@example.com"
                className="bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-secondary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-primary uppercase">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-secondary"
              />
            </div>

            <button
              type="submit"
              className="bg-brand-primary text-white font-bold text-xs py-3.5 rounded-xl hover:bg-brand-primary-hover shadow-md hover:scale-102 transition-all mt-2"
            >
              Sign In Demo Account
            </button>
          </form>

          <div className="border-t border-gray-100 pt-4 text-center text-[10px] text-gray-400">
            <span>Any mock email and password will be accepted for this staging app.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-light min-h-screen pb-16 md:pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-505 font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-brand-primary">My Account</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Profile overview card & menu navigation tabs */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col gap-6">
            
            {/* User Details */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-light text-brand-primary border border-gray-100 rounded-2xl flex items-center justify-center text-3xl font-bold font-heading">
                {user.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <h2 className="font-heading font-bold text-lg text-brand-primary leading-tight">
                  {user.name}
                </h2>
                <span className="text-xs text-gray-400 font-medium">{user.email}</span>
                <span className="bg-brand-secondary/15 text-brand-secondary text-[9px] font-bold px-2 py-0.5 rounded w-fit uppercase tracking-widest mt-1.5">
                  ⭐ VIP Pet Parent
                </span>
              </div>
            </div>

            {/* Menu Nav Links */}
            <nav className="flex flex-col gap-2 border-t border-gray-100 pt-4">
              <button
                onClick={() => { setActiveTab("orders"); setShowAddressForm(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all ${
                  activeTab === "orders" && !showAddressForm
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-gray-600 hover:bg-brand-light"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Order History ({orders.length})
              </button>
              
              <button
                onClick={() => { setActiveTab("addresses"); setShowAddressForm(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all ${
                  activeTab === "addresses" && !showAddressForm
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-gray-600 hover:bg-brand-light"
                }`}
              >
                <MapPin className="w-4 h-4" />
                Shipping Directory ({user.addresses.length})
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold text-rose-500 hover:bg-rose-50 transition-all mt-4 border border-rose-100/50"
              >
                <LogOut className="w-4 h-4" />
                Logout Profile
              </button>
            </nav>

          </div>
        </aside>

        {/* Right Side: Tab Panel Content display */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {/* ADDRESS FORM OVERLAY INLINE */}
          {showAddressForm && (
            <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col gap-5 animate-fade-in-up">
              <h3 className="font-heading font-bold text-lg text-brand-primary border-b border-gray-100 pb-3">
                {editingAddress ? "Modify Shipping Address" : "Add New Shipping Address"}
              </h3>

              <form onSubmit={handleAddressSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-primary uppercase">Receiver Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Roshni Sen"
                      className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-primary uppercase">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-brand-primary uppercase">Street Address</label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="e.g. 12, MG Road, Indiranagar"
                    className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-primary uppercase">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bengaluru"
                      className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-primary uppercase">State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Karnataka"
                      className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-primary uppercase">Pin Code</label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="560008"
                      className="bg-brand-light border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-brand-primary font-semibold cursor-pointer py-1">
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="accent-brand-secondary w-4 h-4 cursor-pointer"
                  />
                  <span>Mark as my primary delivery address</span>
                </label>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowAddressForm(false); setEditingAddress(null); }}
                    className="border border-gray-200 px-5 py-2.5 rounded-full font-bold text-xs hover:bg-brand-light text-brand-primary transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-primary text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-brand-primary-hover shadow-sm transition-all"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 1: ORDER HISTORY PANEL */}
          {activeTab === "orders" && !showAddressForm && (
            <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col gap-6">
              <h2 className="font-heading font-bold text-xl text-brand-primary border-b border-gray-100 pb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-secondary" />
                Purchased Orders
              </h2>

              {orders.length === 0 ? (
                <div className="py-16 text-center flex flex-col items-center justify-center gap-4">
                  <Inbox className="w-12 h-12 text-gray-300" />
                  <h3 className="font-heading font-bold text-lg text-brand-primary">No orders placed yet</h3>
                  <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                    Once you check out products from your shopping cart, they will appear here with dynamic tracking statuses.
                  </p>
                  <Link
                    href="/products"
                    className="bg-brand-primary text-white font-bold text-xs px-6 py-3 rounded-full hover:bg-brand-primary-hover transition-all shadow-sm"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {orders.map((ord) => {
                    const isExpanded = expandedOrderId === ord.id;
                    return (
                      <div 
                        key={ord.id}
                        className="border border-gray-150 rounded-2xl overflow-hidden hover:shadow-sm transition-shadow"
                      >
                        {/* Summary Bar */}
                        <div 
                          className="bg-brand-light/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                          onClick={() => setExpandedOrderId(isExpanded ? null : ord.id)}
                        >
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gray-500 font-semibold">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Date Placed</span>
                              <span className="text-brand-primary font-bold">{ord.date}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Order ID</span>
                              <span className="text-brand-primary font-mono font-bold">{ord.id}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Charged</span>
                              <span className="text-brand-primary font-bold">₹{ord.total.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 justify-between sm:justify-end">
                            <span className="bg-brand-accent/15 text-brand-accent text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-accent/10 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-brand-accent" />
                              {ord.status}
                            </span>
                            <span className="text-xs font-bold text-brand-secondary underline">
                              {isExpanded ? "Hide Details" : "View Details"}
                            </span>
                          </div>
                        </div>

                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="p-6 border-t border-gray-150 flex flex-col gap-6 bg-white animate-scale-in">
                            {/* Products List */}
                            <div className="flex flex-col gap-4">
                              <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Ordered Products</h4>
                              <div className="flex flex-col gap-3">
                                {ord.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs text-gray-500 border-b border-gray-50 pb-2 last:border-0">
                                    <div className="flex items-center gap-3">
                                      <span className="bg-brand-light text-brand-primary font-bold w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                                        {item.quantity}x
                                      </span>
                                      <Link href={`/products/${item.product.id}`} className="hover:underline font-semibold text-brand-primary">
                                        {item.product.name}
                                      </Link>
                                      {item.selectedSize && (
                                        <span className="bg-brand-light text-brand-primary text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                                          {item.selectedSize}
                                        </span>
                                      )}
                                    </div>
                                    <strong className="text-brand-primary font-bold">₹{(item.price * item.quantity).toFixed(2)}</strong>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Shipping address details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
                              <div className="flex flex-col gap-1.5">
                                <h5 className="font-bold text-brand-primary uppercase tracking-wider text-[10px]">Ship To</h5>
                                <strong className="text-brand-primary font-semibold">{ord.shippingAddress.fullName}</strong>
                                <span>{ord.shippingAddress.addressLine}</span>
                                <span>{ord.shippingAddress.city}, {ord.shippingAddress.state} {ord.shippingAddress.zipCode}</span>
                                <span>Phone: {ord.shippingAddress.phone}</span>
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <h5 className="font-bold text-brand-primary uppercase tracking-wider text-[10px]">Order Receipt</h5>
                                <div className="flex justify-between">
                                  <span>Subtotal</span>
                                  <span className="font-bold text-brand-primary">₹{ord.subtotal.toFixed(2)}</span>
                                </div>
                                {ord.discount > 0 && (
                                  <div className="flex justify-between text-brand-accent">
                                    <span>Discount ({ord.couponCode})</span>
                                    <span className="font-bold">-₹{ord.discount.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span>Shipping Fee</span>
                                  <span className="font-bold text-brand-primary">
                                    {ord.shipping === 0 ? "Free" : `₹${ord.shipping.toFixed(2)}`}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>GST (18%)</span>
                                  <span className="font-bold text-brand-primary">₹{ord.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-brand-primary font-bold pt-1.5 border-t border-gray-55 border-dashed">
                                  <span>Total Charged</span>
                                  <span>₹{ord.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ADDRESS BOOK PANEL */}
          {activeTab === "addresses" && !showAddressForm && (
            <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h2 className="font-heading font-bold text-xl text-brand-primary flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-secondary" />
                  Shipping Directory
                </h2>
                <button
                  onClick={handleOpenNewAddress}
                  className="bg-brand-primary text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-brand-primary-hover flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Address
                </button>
              </div>

              {user.addresses.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center gap-4">
                  <MapPin className="w-12 h-12 text-gray-300" />
                  <h3 className="font-heading font-bold text-lg text-brand-primary">No addresses saved</h3>
                  <p className="text-xs text-gray-500">
                    Add shipping addresses to speed up your future checkouts.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      className={`border rounded-2xl p-4 flex flex-col justify-between gap-4 transition-all ${
                        addr.isDefault 
                          ? "border-brand-secondary bg-brand-secondary/5" 
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex flex-col text-xs text-gray-500 gap-1">
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-brand-primary text-sm font-semibold">{addr.fullName}</strong>
                          {addr.isDefault && (
                            <span className="bg-brand-accent/15 text-brand-accent text-[9px] font-bold px-1.5 py-0.5 rounded border border-brand-accent/10">
                              PRIMARY
                            </span>
                          )}
                        </div>
                        <span>{addr.addressLine}</span>
                        <span>{addr.city}, {addr.state} {addr.zipCode}</span>
                        <span>Phone: {addr.phone}</span>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-50">
                        <button
                          onClick={() => handleOpenEditAddress(addr)}
                          className="text-xs text-gray-400 hover:text-brand-primary flex items-center gap-1 font-bold"
                          aria-label="Edit address"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        {!addr.isDefault && (
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="text-xs text-gray-400 hover:text-rose-500 flex items-center gap-1 font-bold"
                            aria-label="Delete address"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </section>

      </div>
    </div>
  );
}
