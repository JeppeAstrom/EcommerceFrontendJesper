export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  categories: Categories[];
  images: ImageType[];
  sizes: SizeType[];
  color: string;
  quantity: number;
  chosenSize: string;
  parentCategory?: string;
  genderType: number;
}


export interface Categories {
  id: number;
  name: string;
}
export interface ImageType {
  id: number;
  imageUrl: string;
}
export interface SizeType {
  id: number;
  size: string;
}
export interface ProductGroup {
  id: number;
  products: Product[];
}
export interface OrderProduct {
  productId: number;
  size: string;
}
