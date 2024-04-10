export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  images: ImageType[];
}

export interface ImageType {
  id: number;
  imageUrl: string;
}
