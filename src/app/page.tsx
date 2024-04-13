import Campaign from "@/components/campaign";
import Carousel from "@/components/carousel";
import ProductCard from "@/components/productcard";
import ProductRain from "@/components/productrain";

import PromotionalCarousel from "@/components/promotionalCarousel";
import { Promotion } from "@/types/promotion";
import { GetAllProducts } from "@/utils/productService";
import Image from "next/image";

const promotion: Promotion[] = [
  {
    promotionTitle: "Rabatt",
    promotionImage:
      "https://i.ebayimg.com/images/g/FAMAAOSwuhZecolk/s-l1200.webp",
  },
  {
    promotionTitle: "Rabatt",
    promotionImage:
      "https://www.instyle.com/thmb/vWiJPNtFK2zgR6ToH-AepzH_a-U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1241159533-2000-79a39b393d4e4d25a903f6b0ed11a9a1.jpg",
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

  return (
    <>
      <Campaign image="https://images6.alphacoders.com/653/653764.jpg" />
      <div className="mb-10">
        <Carousel
          visibleSlidesCountDesktop={3}
          visibleSlidesCountTablet={2}
          visibleSlidesCountMobile={1}
        >
          {promotion.map((promo, index) => (
            <figure
              className="aspect-[9/13] bg-white min-h-full min-w-full"
              key={index}
            >
              <Image
                className="min-w-full object-center h-full object-contain"
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
        <Carousel
          visibleSlidesCountDesktop={5}
          visibleSlidesCountTablet={2}
          visibleSlidesCountMobile={1}
        >
          {Products.map((product, index) => (
            <figure
              className="aspect-[9/13] bg-white min-h-full min-w-full"
              key={index}
            >
              <Image
                className="min-w-full object-center h-full object-contain"
                width={900}
                height={1300}
                alt={product.name}
                src={product.images[0].imageUrl}
              />
            </figure>
          ))}
        </Carousel>
      </div>
      <div>
        <ProductRain products={Products} />
      </div>
    </>
  );
};

export default Home;
