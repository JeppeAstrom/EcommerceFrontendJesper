import { Categories, Product, ProductGroup } from "@/types/product";


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

const GetProductGroup = async(id:string) => {
    let apiRoute = 'https://wa-okx-jesper-aa.azurewebsites.net/api/Products/productGroup/' + id;

    const ProductGroup:ProductGroup= await fetch(apiRoute).then(res => res.json());

    return ProductGroup;
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

export interface ChildCategories {
    id:number;
    name:string;
    parentCategory:null;
    childCategories: Categories[]
}

const getChildCategoriesFromName = async (categoryName: string) => {
    const apiRoute = `https://wa-okx-jesper-aa.azurewebsites.net/api/Categories/childCategoriesFromName?name=${encodeURIComponent(categoryName)}`;
  
    try {
      const response = await fetch(apiRoute);
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
  
      const childCategoriesData = await response.json();
      return childCategoriesData.childCategories || [];
    } catch (error) {

      console.error('Error fetching child categories:', error);

      return [];
    }
  };
  

export { GetAllProducts, GetProduct, getProductsFromCategory, getMainCategories, GetProductGroup, getChildCategoriesFromName };