

import { getProductsFromCategory } from "@/utils/productService";
import ProductRain from '@/components/productrain';



async function GetData(slug:string) {

  
  
    const res = await getProductsFromCategory(slug)
  

    return res;
  }

  export default async function Page({
    params: { slug },
  }: {  
    params: { slug: string }
  }) {
    const data = await GetData(slug)

return(<>
    
    <ProductRain category={slug} products={data}/>
</>)

}
