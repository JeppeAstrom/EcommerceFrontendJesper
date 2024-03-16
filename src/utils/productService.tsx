import { Product } from "@/types/product";


const GetAllProducts = async () => {
    let apiRoute = 'http://localhost:5247/api/Products';

    const ProductList: Product[] = await fetch(apiRoute).then(res => res.json())
  
    return ProductList.$values;

}

const GetProduct = async (id:string) => {
    let apiRoute =  'http://localhost:5247/Products/ById/' + id;

    const Product:Product = await fetch(apiRoute).then(res=> res.json());

    return Product;
}

const getProductsFromCategory = async (category:string) => {
    let apiRoute = 'http://localhost:5247/api/Products/' + category;

    const ProductList: Product[] = await fetch(apiRoute).then(res => res.json())

    return ProductList.$values;
}

export { GetAllProducts, GetProduct, getProductsFromCategory };