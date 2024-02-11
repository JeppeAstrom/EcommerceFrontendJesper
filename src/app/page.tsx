
import ProductRain from "@/components/productrain";
import { GetAllProducts } from "@/utils/productService";

const categories:string[] = ["electronics",
"jewelery",
"men's clothing",
"women's clothing"]


const Home = async ()  => {

  const Products = await GetAllProducts();
 
  return(<>
    <div className="flex items-center w-full justify-center gap-6">
    {categories.map((category, index) => (
       <span className="border p-4 text-lg" key={index}>{category}</span>
   ))}
    </div>
    <ProductRain products={Products}/>
  </>)
}

export default Home;