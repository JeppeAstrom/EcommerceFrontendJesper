/* eslint-disable @next/next/no-img-element */
"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "@/app/context/cartContext";
import {
  GetProduct,
  GetProductGroup,
  getProductsFromCategory,
} from "@/utils/productService";
import { Product, ProductGroup } from "@/types/product";
import { usePathname } from "next/navigation"; // Import from next/navigation instead of next/router
import Link from "next/link";
import Carousel from "@/components/carousel";

import Image from "next/image";
import GetReviewFromProductId, { ReviewDto } from "@/utils/reviewService";
import Star from "@/app/icons/star";
import HeartIcon from "@/app/icons/hearticon";

const ProductPage = () => {
  const {
    handleAddToCart,
    addProductToFavouritesLocalStorage,
    getFavouritesFromLocalStorage,
  }: any = useContext(Context);
  const pageUrl = usePathname();
  const id = pageUrl.split("/").pop(); // Extract the id from the URL path

  const [fetchedProduct, setProduct] = useState<Product | null>(null);
  const [productGroup, setProductGroup] = useState<ProductGroup | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>();
  const [reviews, setReviews] = useState<ReviewDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const fetchedProduct: Product = await GetProduct(id);
          const ProductGroup: ProductGroup = await GetProductGroup(id);
          const reviews: ReviewDto[] = await GetReviewFromProductId(id);
          const recommendedProducts: Product[] = await getProductsFromCategory(
            fetchedProduct.categories[0].name
          );
          setProduct(fetchedProduct);
          setProductGroup(ProductGroup);
          setReviews(reviews);
          setRecommendedProducts(recommendedProducts);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };
    fetchData();
  }, [id]);
  const [swatchAmount, setSwatchAmount] = useState<number>();
  useEffect(() => {
    if (window.innerWidth) {
      setSwatchAmount(window.innerWidth > 0 && window.innerWidth < 768 ? 3 : 4);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageScore = totalScore / reviews.length;

  const stars = (score: number, showNumber = true) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(<Star key={i} filled={i <= score} />);
    }
    return (
      <div className="flex flex-col">
        {showNumber && (
          <span className="text-right font-light text-slate-700">{`${score} av 5`}</span>
        )}
        <span className="flex">{stars}</span>
      </div>
    );
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReviewsExpanded, setReviewsExpanded] = useState(false);

  const visibleProducts =
    productGroup && productGroup.products
      ? isExpanded
        ? productGroup.products
        : productGroup.products.slice(0, swatchAmount || 3)
      : [];

  const visibleReviews =
    reviews && reviews
      ? isReviewsExpanded
        ? reviews
        : reviews.slice(0, 2)
      : [];

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setIsOpen(false);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const [favourite, setFavourite] = useState<boolean>(false);
  const toggleFavourite = () => {
    addProductToFavouritesLocalStorage(fetchedProduct);
    setFavourite(!favourite);
  };
  useEffect(() => {
    const favouriteProducts: Product[] = getFavouritesFromLocalStorage();
    setFavourite(favouriteProducts.some((p) => p.id === fetchedProduct?.id));
  }, [getFavouritesFromLocalStorage, fetchedProduct?.id]);

  if (!fetchedProduct) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen flex flex-col justify-center items-center bg-white z-[16]">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-black"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <p className="text-title2-bold mt-9">Laddar</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4">
      <div className="flex w-full justify-center items-center mx-auto mb-10">
        <div className="lg:flex w-full">
          <Carousel
            visibleSlidesCountDesktop={1}
            visibleSlidesCountMobile={1}
            visibleSlidesCountTablet={1}
            useProgressBar={true}
          >
            {fetchedProduct.images.map((image, index) => (
              <figure
                key={index}
                className="lg:aspect-13/9 aspect-9/13 bg-neutral-100 min-h-full w-full"
              >
                <HeartIcon
                  favourite={favourite}
                  onClick={toggleFavourite}
                  className="h-12 w-12 absolute top-0 right-2"
                />
                <Image
                  className="min-w-full object-center max-h-full object-contain"
                  width={900}
                  height={1300}
                  alt={fetchedProduct.name}
                  src={image.imageUrl}
                />
              </figure>
            ))}
          </Carousel>

          <div className="lg:p-4 w-full lg:px-6 relative md:pt-2 pt-7">
            <span className="line-clamp-1 text-lg font-light">
              {fetchedProduct.name}
            </span>
            <div className="mt-1">
              <span className="mt-4 text-xl font-semibold line-clamp-8 ">
                {fetchedProduct.description}
              </span>
            </div>
            <div className="pt-2 flex justify-between">
              <span className="text-lg font-semibold">
                {fetchedProduct.price} kr
              </span>
              {reviews && reviews.length > 0 && stars(averageScore)}
            </div>

            <>
              {productGroup?.products &&
                productGroup.products.length > 0 &&
                visibleProducts && (
                  <div className="pt-4 grid grid-cols-3 md:grid-cols-4 gap-4 lg:w-[320px] justify-evenly items-center">
                    {visibleProducts.map((product, index) => (
                      <Link
                        href={`/produkter/${product.id}`}
                        className="aspect-[9/13]"
                        key={index}
                      >
                        <Image
                          className="w-full h-full object-contain object-center"
                          width={900}
                          height={1300}
                          alt={product.name}
                          src={product.images[0].imageUrl}
                        />
                        <div
                          className={`inline-block w-full h-1 ${
                            product.id === fetchedProduct.id
                              ? "bg-black"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      </Link>
                    ))}
                  </div>
                )}
              {productGroup &&
                Array.isArray(productGroup.products) &&
                productGroup?.products.length > 3 &&
                !isExpanded &&
                visibleProducts?.length !== productGroup.products.length && (
                  <button
                    className="text-center py-2 border-b border-black font-semibold px-1 text-sm"
                    onClick={() => setIsExpanded(true)}
                  >
                    Visa mer
                  </button>
                )}
              {productGroup &&
                Array.isArray(productGroup.products) &&
                productGroup?.products.length > 3 &&
                isExpanded && (
                  <button
                    className="text-center py-2 border-b border-black font-semibold px-1 text-sm"
                    onClick={() => setIsExpanded(false)}
                  >
                    Visa mindre
                  </button>
                )}
            </>
            <div className="pt-4">
              {fetchedProduct.sizes.length > 0 && (
                <div ref={wrapperRef} className="relative">
                  <button
                    className="border w-full text-start pl-4 p-2"
                    onClick={toggleDropdown}
                  >
                    {selectedSize || "Välj storlek"}
                  </button>
                  {isOpen && (
                    <ul className="absolute border-l border-r w-full bg-white z-[2] cursor-pointer">
                      {fetchedProduct.sizes.map((size, index) => (
                        <li
                          key={index}
                          className="p-3 border-b"
                          onClick={() => handleSizeSelect(size.size)}
                        >
                          {size.size}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="pt-4 flex justify-center items-center">
                <button
                  onClick={() => handleAddToCart(fetchedProduct)}
                  className="border w-full p-3 bg-black text-white font-semibold"
                >
                  Handla
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visibleReviews && visibleReviews.length > 0 && (
        <div className="flex flex-col gap-6 w-full md:w-[500px] px-4 mb-10">
          {visibleReviews.map((review, index) => (
            <div key={index}>
              <div className="flex flex-col w-full">
                <span className="pb-2 font-semibold">
                  {review.appUser.firstName}
                </span>
                {stars(review.rating, false)}
              </div>
              <p className="pt-4 font-light text-sm">{fetchedProduct.name}</p>
              <p className="pt-2">{review.comment}</p>
            </div>
          ))}
          {visibleReviews && !isReviewsExpanded && reviews.length > 2 && (
            <button
              className="text-center py-2 border-b border-black font-semibold px-1 text-sm w-[70px]"
              onClick={() => setReviewsExpanded(true)}
            >
              Visa mer
            </button>
          )}
          {visibleReviews && isReviewsExpanded && reviews.length > 2 && (
            <button
              className="text-center py-2 border-b border-black font-semibold px-1 text-sm w-[90px]"
              onClick={() => setReviewsExpanded(false)}
            >
              Visa mindre
            </button>
          )}
        </div>
      )}
      {recommendedProducts && (
        <div className="mb-10 py-4">
          <span className="font-semibold text-lg">
            Rekommenderade produkter
          </span>
          <Carousel
            visibleSlidesCountDesktop={5}
            visibleSlidesCountTablet={2}
            visibleSlidesCountMobile={1}
          >
            {recommendedProducts.map((product, index) => (
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
      )}
    </div>
  );
};

export default ProductPage;
