export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  category:string;
  price: number;
  oldPrice?:number;
  descriptionEn: string;
  descriptionAr: string;
  images: string[];
  ingredientsEn: string;
  ingredientsAr: string;
  usageEn:string;
  usageAr:string;
  size:number;
  rating:number;
  inStock?:boolean;
  review:Review[];
}
export interface Review {
  productID:number;
  rating: number;
  comment: string;
  author: string;
}
