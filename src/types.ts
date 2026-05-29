export interface Product {
  id: string;
  title: string;
  category: 'smartphones' | 'laptops' | 'gaming' | 'accessories' | 'smartwatches' | 'tvs' | 'woofers';
  priceKes: number;
  originalPriceKes: number;
  condition: 'Brand New' | 'Refurbished (Excellent)' | 'Refurbished (Good)' | 'Open Box';
  storage?: string;
  ram?: string;
  batteryHealth?: string;
  warranty: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  inStock: boolean;
  quantityLeft: number;
  tags: string[];
  keySpecs: { label: string; value: string }[];
  isDealOfTheDay?: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
  relatedProductIds?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  src?: string; // Optional screenshot / logo
  date: string;
  deviceBought: string;
  verified: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredCategory: string;
  timestamp: string;
}

export interface TradeInEstimate {
  brand: string;
  model: string;
  potentialValueKes: number;
}
