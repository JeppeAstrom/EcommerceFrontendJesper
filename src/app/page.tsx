
import Campaign from "@/components/campaign";
import Carousel from "@/components/carousel";
import FilterBar from "@/components/filterBar";
import ProductRain from "@/components/productrain";
import { GetAllProducts } from "@/utils/productService";

const categories:string[] = ["electronics",
"jewelery",
"men's clothing",
"women's clothing"]


const Home = async ()  => {

  const Products = await GetAllProducts();
 
  return(<>
  

    <Campaign image="https://images6.alphacoders.com/653/653764.jpg"/>

    <div className="mt-10 p-4">
    <Carousel title="Trendigt hos oss" products={Products}/>
    </div>
  </>)
}

export default Home;