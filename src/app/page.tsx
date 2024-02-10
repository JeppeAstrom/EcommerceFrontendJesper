"use client"
import ProductRain from "@/components/productrain";
import { GetAllProducts } from "@/utils/productService";




const Home = async ()  => {

  const Products = await GetAllProducts();
 
  return(<>
    <ProductRain products={Products}/>
  </>)
}

export default Home;