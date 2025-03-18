export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  benefits: string[];
  ingredients: string[];
  size?:number;
  rating?:number;
  inStock?:boolean;
  review:Review[];
}
export interface Review {
  rating: number;
  comment: string;
  author: string;
}
