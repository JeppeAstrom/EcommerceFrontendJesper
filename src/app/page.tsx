
import Campaign from "@/components/campaign";
import Carousel from "@/components/carousel";
import FilterBar from "@/components/filterBar";
import ProductRain from "@/components/productrain";
import PromotionalCarousel from "@/components/promotionalCarousel";
import { Promotion } from "@/types/promotion";
import { GetAllProducts } from "@/utils/productService";

const promotion:Promotion[] = [{promotionTitle:'Rabatt', promotionImage: 'https://i.ebayimg.com/images/g/FAMAAOSwuhZecolk/s-l1200.webp'},
 {promotionTitle: 'Rabatt', promotionImage: 'https://www.instyle.com/thmb/vWiJPNtFK2zgR6ToH-AepzH_a-U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1241159533-2000-79a39b393d4e4d25a903f6b0ed11a9a1.jpg'}, 
 {promotionTitle: 'Rabatt', promotionImage: 'https://media.gq-magazine.co.uk/photos/644663a9d8c083bf85028de7/master/w_1600%2Cc_limit/GettyImages-1252110511.jpg'},
 {promotionTitle: 'Rabatt', promotionImage: 'https://hollywoodlife.com/wp-content/uploads/2023/03/adam-sandler-style-mega-07.jpg'}]



const Home = async ()  => {

  const Products = await GetAllProducts();

  return(<>
  

    <Campaign image="https://images6.alphacoders.com/653/653764.jpg"/>
      <div className="mb-10">
      <PromotionalCarousel title="Spana in Sandler kollektionen" promotion={promotion} slidesDesktop={2} slidesPhone={1} slidesTablet={1}/>
      </div>
    <div className="mt-10 p-4">
    <Carousel slidesDesktop={4} slidesTablet={3} slidesPhone={1} title="Trendigt hos oss" products={Products}/>
    </div>
  </>)
}

export default Home;