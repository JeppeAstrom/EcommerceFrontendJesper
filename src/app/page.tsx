
import Carousel from "@/components/carousel";
import ProductRain from "@/components/productrain";
import { Category } from "@/types/category";
import { Promotion } from "@/types/promotion";
import { GetAllProducts, getMainCategories } from "@/utils/productService";
import Image from "next/image";
import Link from "next/link";
const promotion: Promotion[] = [
  {
    promotionTitle: "Rabatt",
    promotionImage:
      "https://hips.hearstapps.com/hmg-prod/images/adam-sandler-is-seen-at-jimmy-kimmel-live-on-june-01-2022-news-photo-1656425616.jpg",
  },
  {
    promotionTitle: "Rabatt",
    promotionImage:
      "https://media.gq.com/photos/59230af034edbe5f3532edd0/master/w_1600%2Cc_limit/adam-sandler.jpg",
  },
  {
    promotionTitle: "Rabatt",
    promotionImage:
      "https://media.gq-magazine.co.uk/photos/644663a9d8c083bf85028de7/master/w_1600%2Cc_limit/GettyImages-1252110511.jpg",
  },
  {
    promotionTitle: "Rabatt",
    promotionImage:
      "https://hollywoodlife.com/wp-content/uploads/2023/03/adam-sandler-style-mega-07.jpg",
  },
];

const Home = async () => {
  const Products = await GetAllProducts();
  const Categories:Category[] = await getMainCategories()

  return (
    <div className="px-4">
      
      <div className="mb-10 mt-6">
      <span className="font-light text-2xl pl-1">Sandler kollektionen</span>
        <Carousel
          visibleSlidesCountDesktop={2}
          visibleSlidesCountTablet={2}
          visibleSlidesCountMobile={1}
          scrollByItself={true}
        >
          {promotion.map((promo, index) => (
            <figure
              className="aspect-[9/13] bg-white min-h-full min-w-full pt-3"
              key={index}
            >
              <Image
                className="min-w-full object-center h-full object-fill"
                width={900}
                height={1300}
                alt={promo.promotionTitle}
                src={promo.promotionImage}
              />
            </figure>
          ))}
        </Carousel>
      </div>
      <div className="mb-10">
        <span className="text-2xl pl-1  font-light">Våra kategorier</span>
        
          <div className="relative">
        <Carousel
          visibleSlidesCountDesktop={4}
          visibleSlidesCountTablet={3}
          visibleSlidesCountMobile={2}
        >
          {Categories.map((category, index) => (
            <div className="flex flex-col min-h-full">
            <Link
              href={`/produkter/kategori/${category.name}`}
              className="aspect-[9/13] bg-white h-full min-w-full pt-4"
              key={index}
            >
              <Image
                className="min-w-full object-center h-full object-fill"
                width={900}
                height={1300}
                alt={category.name}
                src={category.imageUrl}
              />
         
            </Link>
        <span className="mt-8 text-normal pl-1  font-semibold border-b w-fit border-black pb-1">{category.name}</span>
        </div>
          ))}
        </Carousel>
        </div>
   
      </div>
      <div className="pt-10">
      <span className="text-xl md:text-2xl pl-1 font-sans font-light border-b border-black pb-2 md:ml-20 ml-2">Nyheter</span>
        <ProductRain products={Products} />
      </div>
    </div>
  );
};

export default Home;
