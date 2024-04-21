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
                setTimeout(() => setLeftReview(false), 1500);
            } else {
                console.error('Failed to post review:');
            }
        } catch (error) {
            console.error('Error posting review:', error);
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
      <div className="flex flex-row p-2 lg:p-2 py-3 pr-6 w-full">
        <div className="w-2/4 items-center flex justify-center pl-3">
          <Link href={'/produkter/' + product.id} className="aspect-[9/13] bg-white items-center justify-center flex min-w-full h-full">
            <Image
              width={1300}
              height={900}
              alt=""
              src={product.images[0].imageUrl}
              className="object-contain object-center min-h-full min-w-full"
            />
          </Link>
        </div>
        <div className="flex flex-col pl-2 w-full relative">
          <div className="flex justify-between">
            <span className="text-serif font-semibold line-clamp-2 max-w-[200px] lg:max-w-[300px] md:max-w-[500px]">
              {product.name}
            </span>
          </div>

          <span className="text-sm line-clamp-2 font-light max-w-[200px] lg:max-w-[300px] md:max-w-[500px]">
            {product.description}
          </span>

          <div className="flex-col md:gap-1 flex pt-1 pr-4">
            <span className="text-sm font-semibold">{product.price} kr</span>
            <span className=" text-sm font-semibold">Storlek: {size}</span>
          </div>
          <div className="gap-2 flex mt-auto w-full items-center">
            <button
              onClick={toggleReview}
              className="border p-2 md:p-3 bg-black font-semibold text-white  text-center"
            >
              Recensera
            </button>
            <button
              onClick={() => {
                product.chosenSize = product.chosenSize = size;
                handleAddToCart(product);
              }}
              className="border p-2 md:p-3 bg-black font-semibold text-white md:w-[120px] w-[100px] text-center"
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
            <div className="w-full flex">
              <div className="flex-col w-3/5">
                <div className="flex py-2 w-full">{stars}</div>
                <textarea
                maxLength={148}
                  style={{resize: 'none'}}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Kommentar"
                  className="w-full lg:h-[100px] h-[80px] border-black border p-2 font-light text-sm"
                />

                <button type="submit" className="border p-2 md:p-3 bg-black font-semibold text-white w-full text-center">
                  {isLoading ? (
                    <LoadingSpinner className="w-6 h-6" type="Small"/>
                  ) : (
                leftReview ? 'Tack för din recension': 'Recensera'
              )}
                </button>
              </div>
              <div className="w-2/5 mx-auto items-center flex justify-center pl-3">
                <figure className="aspect-[9/13] flex-col bg-white items-center justify-center flex min-w-full h-full">
                  <Image
                    width={1300}
                    height={900}
                    alt=""
                    src={product.images[0].imageUrl}
                    className="object-contain object-center min-h-full min-w-full"
                  />
                  <span className="text-normal font-semibold  mr-auto ">
                    Storlek: {size}
                  </span>
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
