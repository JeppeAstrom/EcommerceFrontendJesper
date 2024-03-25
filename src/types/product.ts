export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  images: Image[];
}

export interface Image {
  id: number;
  imageUrl: string;
}
