export interface Subcategory {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string; // SVG icon or standard emoji
  image: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // for discount calculations
  image: string;
  hoverImage?: string;
  category: string; // Category slug
  subcategory: string; // Subcategory slug
  petType: "dog" | "cat" | "bird" | "fish" | "small-pet";
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isHealthcare?: boolean; // Highlight in healthcare collection
  brand: string;
  specs: Record<string, string>;
  sizes?: string[]; // e.g., ["2kg", "5kg", "12kg"] or ["S", "M", "L"]
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Address {
  id: string;
  fullName: string;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: {
    product: Product;
    quantity: number;
    price: number;
    selectedSize?: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  couponCode?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
}
