import { Product } from "@/types/product";
import { NextPage } from "next";

interface Props {
product: Product
}

const HorizontalCard:NextPage<Props> = ({product}) => {
   return(<>
    <div className="flex flex-row h-[400px]">
    <figure className="aspect-w-9 aspect-h-13 overflow-hidden h-[400px]">
    <img src={product.image}/>
    </figure>
    <div className="flex flex-col pl-2">
    <span>{product.title}</span>
    <span className="text-sm line-clamp-2">{product.description}</span>
        <div className="justify-between flex pt-1">
        <span>{product.price} kr</span>
        <button className="w-[100px] bg-amber-400 rounded-md hover:bg-amber-300">Checkout</button>
        </div>
   
    </div>
    </div>
    </>)
}
export default HorizontalCard;