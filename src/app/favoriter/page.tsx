'use client'
import { useContext } from "react";
import { Context } from "../context";
import { Product } from "@/types/product";
import ProductRain from "@/components/productrain";

const Favourites = () => {

    const {getFavouritesFromLocalStorage}: any = useContext(Context);

    const favourites:Product[] = getFavouritesFromLocalStorage();
    console.log(favourites)
    return(<>
    <ProductRain products={favourites}/>
    </>)
}
export default Favourites;