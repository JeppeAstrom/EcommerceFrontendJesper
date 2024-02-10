import { Product } from "@/types/product";


const GetAllProducts = async () => {
    let apiRoute = 'https://fakestoreapi.com/products';

    const ProductList: Product[] = await fetch(apiRoute).then(res => res.json())

    return ProductList;

}

const GetProduct = async (id:string) => {
    let apiRoute =  'https://fakestoreapi.com/products/' + id;

    const Product:Product = await fetch(apiRoute).then(res=> res.json());

    return Product;
}

export { GetAllProducts, GetProduct };