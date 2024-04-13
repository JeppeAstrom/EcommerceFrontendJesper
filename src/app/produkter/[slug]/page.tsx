/* eslint-disable @next/next/no-img-element */
"use client";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context";
import { GetProduct } from "@/utils/productService";
import { Product } from "@/types/product";
import { usePathname, useSearchParams } from "next/navigation"; // Import from next/navigation instead of next/router
import Link from "next/link";
import Carousel from "@/components/carousel";
import { useRouter } from "next/router";
import CarouselPDP from "@/components/carouselPDP";
import Image from "next/image";

const ProductPage = () => {
  const { handleAddToCart }: any = useContext(Context);
  const pageUrl = usePathname();
  const id = pageUrl.split("/").pop(); // Extract the id from the URL path

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const fetchedProduct: Product = await GetProduct(id);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };
    fetchData();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex w-3/4 justify-center items-center mx-auto mb-10">
      <div className="lg:flex w-full">
        <div className="aspect-[9/13] bg-white h-full w-full relative">
          <Carousel
            visibleSlidesCountDesktop={1}
            visibleSlidesCountMobile={1}
            visibleSlidesCountTablet={1}
          >
            {product.images.map((image, index) => (
              <figure
                key={index}
                className="aspect-[9/13] bg-white min-h-full min-w-full"
              >
                <Image
                  className="min-w-full object-center h-full object-contain"
                  width={900}
                  height={1300}
                  alt={product.name}
                  src={image.imageUrl}
                />
              </figure>
            ))}
          </Carousel>
        </div>
        <div className="lg:p-8 relative">
          <span className="line-clamp-1 border-b border-black text-lg">
            {product.name}
          </span>
          <div className="mt-2">
            <span className="mt-4 text-sm line-clamp-8">
              {product.description}
            </span>
            <div className="flex justify-between pt-4">
              <Link
                href="/kassa"
                onClick={() => handleAddToCart(product, "YES")}
                className="right-0 w-[150px] h-[50px] rounded-xl bg-amber-400 items-center justify-center flex"
              >
                Köp
              </Link>
              <span className="">{product.price}kr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
