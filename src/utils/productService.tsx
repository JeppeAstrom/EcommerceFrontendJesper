import { Product } from "@/types/product";


const GetAllProducts = async () => {
    let apiRoute = 'https://wa-okx-jesper-aa.azurewebsites.net/api/Products';

    const ProductList: Product[] = await fetch(apiRoute).then(res => res.json())
 
    return ProductList;

}

const GetProduct = async (id:string) => {
    let apiRoute =  'https://wa-okx-jesper-aa.azurewebsites.net/Products/ById/' + id;

    const Product:Product = await fetch(apiRoute).then(res=> res.json());

    return Product;
}

const getProductsFromCategory = async (category:string) => {
    let apiRoute = 'https://wa-okx-jesper-aa.azurewebsites.net/api/Products/' + category;

    const ProductList: Product[] = await fetch(apiRoute).then(res => res.json())

    return ProductList;
}

const getMainCategories = async() => {
    let apiRoute = 'https://wa-okx-jesper-aa.azurewebsites.net/api/Categories';

    const categories = await fetch(apiRoute).then(res => res.json());

    return categories;
}

export { GetAllProducts, GetProduct, getProductsFromCategory, getMainCategories };