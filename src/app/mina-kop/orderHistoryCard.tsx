/* eslint-disable @next/next/no-img-element */

import { Product } from "@/types/product";
import { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/cartContext";
import Modal from "@/components/modal";
import RegistrationModal from "@/components/forms/registrationModal";
import ReviewModal from "./reviewModal";
import Star from "../icons/star";
import { PostReview } from "@/utils/reviewService";
import LoadingSpinner from "@/components/spinners/loadingSpinner";
import Link from "next/link";
import { CartItem } from "@/utils/cartService";

interface Props {
  product: Product;
  size: string;
}

const OrderHistoryCard: NextPage<Props> = ({ product, size }) => {
  const context = useContext(Context);
  const { handleAddToCart }: any = context;



  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const [reviewComment, setReviewComment] = useState<string>();
  const [leftReview, setLeftReview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleReview = () => setReviewModal((prev) => !prev);

  const [score, setScore] = useState(0);
  const totalStars = 5;
  const handleStarClick = (index: number) => {
    setScore(index);
  };

  const LeaveReview = async () => {
    if (reviewComment && score) {
        setIsLoading(true);
        try {
            const response = await PostReview(score, reviewComment, product.id);
            if (response?.ok) {
                setLeftReview(true);
                setTimeout(() => {setLeftReview(false)
                  toggleReview();
                }, 1500);
              
            } else {
              
            }
        } catch (error) {
         
        } finally {
            setIsLoading(false);
        }
    }
};


    useEffect(() => {
      if(!reviewModal){
        setReviewComment(undefined)
        setScore(0);
      }
      
    },[leftReview, reviewModal])

  useEffect(() => {
    if (reviewModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [reviewModal]);

  const stars = Array.from({ length: totalStars }, (_, index) => (
    <Star
      key={index + 1}
      filled={index < score}
      onClick={() => handleStarClick(index + 1)}
      className="cursor-pointer"
    />
  ));
  
  return (
    <>
      <div className="flex flex-col w-full">
          <Link href={'/produkter/' + product.id} className="aspect-[9/13] bg-neutral-100 items-center justify-center flex min-w-full h-full">
            <Image
              width={1300}
              height={900}
              alt=""
              src={product.images[0].imageUrl}
              className="object-contain object-center min-h-full min-w-full"
            />
          </Link>
   
        <div className="flex flex-col pl-2 w-full relative">
          <div className="flex justify-between">
            <span className="mt-2 font-semibold line-clamp-1 max-w-[200px] lg:max-w-[300px] md:max-w-[500px]">
              {product.name}
            </span>
          </div>

          <span className="text-sm line-clamp-1  max-w-[200px] lg:max-w-[300px] md:max-w-[500px]">
            {product.description}
          </span>

          <div className="flex-col md:gap-1 flex pt-1 pr-4">
            <span className="text-sm font-bold">{product.price} kr</span>
            <span className=" text-sm font-semibold">Storlek: {size}</span>
          </div>
          <div className="mt-3 gap-1 flex w-full items-center">
            <button
              onClick={toggleReview}
              className="border p-2 border-black text-xs md:text-sm w-full font-semibold text-center"
            >
              Recensera
            </button>
            <button
              onClick={() => {
                const cartItem:CartItem = {
                  id: product.id,
                  name:product.name,
                  imageUrl:product.images[0].imageUrl,
                  description:product.description,
                  productId: product.id,
                  quantity: product.quantity,
                  price:product.price,
                  chosenSize:size
                }
                handleAddToCart(cartItem, cartItem);
              }}
              className="border w-full p-2 bg-black text-xs md:text-sm font-semibold text-white text-center"
            >
              Köp igen
            </button>
          </div>
        </div>
      </div>
      {reviewModal && (
        <ReviewModal title={product.name} toggleModal={toggleReview}>
          <form onSubmit={(e) => {
            e.preventDefault();
            LeaveReview()}} className="w-full flex items-center justify-center px-4">
            <div className="w-full flex items-center">
              <div className="flex-col w-3/5 flex items-center justify-center h-full">
                <div className="flex justify-between w-full">
              <span className="text-normal font-semibold">
                    Storlek: {size}
                  </span>
                  <span className="text-md font-semibold border-b border-black">
                   {product.price} kr
                  </span>
                  </div>
                <div className="flex py-1 w-full">{stars}</div>
                <textarea
                maxLength={148}
                  style={{resize: 'none'}}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Kommentar"
                  className="w-full lg:h-[100px] h-[80px] border-black border p-2 text-sm"
                />

                <button type="submit" className="border p-2 md:p-3 bg-black font-semibold text-white w-full text-center mt-4">
                  {isLoading ? (
                    <LoadingSpinner className="w-6 h-6" type="Small"/>
                  ) : (
                leftReview ? 'Tack för din recension': 'Recensera'
              )}
                </button>
              </div>
              <div className="w-2/5 mx-auto items-center flex justify-center pl-3">
                <figure className="aspect-[9/13] flex-col bg-neutral-100 items-center justify-center flex min-w-full h-full">
                  <Image
                    width={1300}
                    height={900}
                    alt=""
                    src={product.images[0].imageUrl}
                    className="object-contain object-center min-h-full min-w-full"
                  />
                 
                </figure>
              </div>
            </div>
          </form>
        </ReviewModal>
      )}
    </>
  );
};
export default OrderHistoryCard;
