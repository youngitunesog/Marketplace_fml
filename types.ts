export type ProductType =
  | "Men"
  | "Women"
  | "Sneakers"
  | "Bags"
  | "Watches"
  | "Luxury"
  | "Streetwear"
  | "Accessories";

export interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice: string;
  image: string;
  rating: number;
  type: ProductType[];
}