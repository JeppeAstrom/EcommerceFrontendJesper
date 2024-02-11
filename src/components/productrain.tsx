

import ProductCard from "@/components/productcard";
import { Product } from "@/types/product";
import { GetAllProducts } from "@/utils/productService";
import { NextPage } from "next";


interface Props {
products: Product[];
}

const ProductRain:NextPage<Props> = async ({products})  => {
 
  return(<>
  	
  <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-7 pt-10">
    {products.map((product, index) => (
      <div key={index}>
        <ProductCard product={product}/>
         </div>
    ))}
  </div>
 
  </>)
}

export default ProductRain;