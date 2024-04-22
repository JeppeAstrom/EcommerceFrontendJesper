

import { ChildCategories, getChildCategoriesFromName, getProductsFromCategory } from "@/utils/productService";
import ProductRain from '@/components/productrain';



async function GetData(slug:string) {
    const res = await getProductsFromCategory(slug)

    return res;
  }
  async function GetSubCategories(slug:string) {
    const res = await getChildCategoriesFromName(slug)

    return res;
  }

  export default async function Page({
    params: { slug },
  }: {  
    params: { slug: string }
  }) {
    
    const childCategories = await GetSubCategories(slug);
    const data = await GetData(slug)

return(<>
    
    <ProductRain childCategories={childCategories} category={slug} products={data}/>
</>)

}
