import { Categories, Product, ProductGroup } from "@/types/product";


const GetAllProducts = async (page: number = 1, pageSize: number = 12) => {
  const apiRoute = `https://wa-okx-jesper-aa.azurewebsites.net/api/Products?page=${page}&pageSize=${pageSize}`;

  try {
      const response = await fetch(apiRoute);
      if (!response.ok) {
     return [];
      }
      const productList: Product[] = await response.json();
      return productList;
  } catch (error) {
    
      return [];
  }
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

const getProductsFromCategory = async (category: string, gender: number, page: number = 1, pageSize: number = 12) => {
  const apiRoute = `https://wa-okx-jesper-aa.azurewebsites.net/api/Products/${category}?genderType=${gender}&page=${page}&pageSize=${pageSize}`;

      const response = await fetch(apiRoute);
   
      const productList: Product[] = await response.json();
      return productList;
 
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



      return [];
    }
  };
  

export { GetAllProducts, GetProduct, getProductsFromCategory, getMainCategories, GetProductGroup, getChildCategoriesFromName };