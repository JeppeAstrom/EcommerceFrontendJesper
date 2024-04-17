
import Carousel from "@/components/carousel";
import ProductRain from "@/components/productrain";
import { Promotion } from "@/types/promotion";
import { GetAllProducts } from "@/utils/productService";
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

  return (
    <div className="px-4">
      
      <div className="mb-10 pt-10">
      <span className="text-semibold text-xl pl-1">Sandler kollektionen</span>
        <Carousel
          visibleSlidesCountDesktop={2}
          visibleSlidesCountTablet={2}
          visibleSlidesCountMobile={1}
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
        <span className="text-semibold text-xl pl-1">Rekommenderade produkter</span>
        <Carousel
          visibleSlidesCountDesktop={5}
          visibleSlidesCountTablet={2}
          visibleSlidesCountMobile={1}
          useProgressBar={true}
        >
          {Products.map((product, index) => (
            <Link
              href={`/produkter/${product.id}`}
              className="aspect-[9/13] bg-white min-h-full min-w-full pt-4"
              key={index}
            >
              <Image
                className="min-w-full object-center h-full object-contain"
                width={900}
                height={1300}
                alt={product.name}
                src={product.images[0].imageUrl}
              />
            </Link>
          ))}
        </Carousel>
      </div>
      <div>
        <ProductRain products={Products} />
      </div>
    </div>
  );
};

export default Home;
