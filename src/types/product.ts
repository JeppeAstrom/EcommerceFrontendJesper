export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  images: Image[];
}

interface Image {
  id: number;
  imageUrl: string;
}
