
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
  
    <div className="shadow-lg mt-10 p-4">
    <Carousel title="Trendigt hos oss" products={Products}/>
    </div>

    <ProductRain products={Products}/>
  </>)
}

export default Home;