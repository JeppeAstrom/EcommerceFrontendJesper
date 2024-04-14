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

  return (
    <>
      <Campaign image="https://images6.alphacoders.com/653/653764.jpg" />
      <div className="mb-10 pt-10">
        <Carousel
          visibleSlidesCountDesktop={2}
          visibleSlidesCountTablet={2}
          visibleSlidesCountMobile={1}
        >
          {promotion.map((promo, index) => (
            <figure
              className="aspect-[9/13] bg-white min-h-full min-w-full"
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
