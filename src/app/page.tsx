
import Carousel from "@/components/carousel";
import ProductRain from "@/components/productrain";
import { GetAllProducts } from "@/utils/productService";

const categories:string[] = ["electronics",
"jewelery",
"men's clothing",
"women's clothing"]


const Home = async ()  => {

  const Products = await GetAllProducts();
 
  return(<>
  
    
    <Carousel title="Trendigt hos oss" products={Products}/>
 

    <ProductRain products={Products}/>
  </>)
}

export default Home;