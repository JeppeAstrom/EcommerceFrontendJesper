'use client'
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/cartContext";
import { Product } from "@/types/product";
import ProductRain from "@/components/productrain";

const Favourites = () => {

    const {getFavouritesFromLocalStorage}: any = useContext(Context);
    const [favourites, setFavourites] = useState<Product[]>([]);

    useEffect(() => {
        const favs = getFavouritesFromLocalStorage();
        setFavourites(favs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return(<>
    <ProductRain products={favourites}/>
    </>)
}
export default Favourites;