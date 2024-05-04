'use client'
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/cartContext";
import { Product } from "@/types/product";
import ProductRain from "@/components/productrain";
import { AuthContext } from "../context/authContext";
import { GetFavourites } from "@/utils/favouriteService";
import LoadingSpinner from "@/components/spinners/loadingSpinner";

const Favourites = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const { isAuthenticated }: any = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [favourites, setFavourites] = useState<Product[]>([]);
    const {getFavouritesFromLocalStorage}: any = useContext(Context);

    useEffect(() => {
      const checkAuthentication = async () => {
          const isLoggedin = await isAuthenticated();
          setIsLoggedIn(isLoggedin);
          setIsLoading(false); 
      };

      checkAuthentication();
  }, [isAuthenticated]);
  

  useEffect(() => {
    if (isLoggedIn === null) {
        return;
    }

    const fetchFavourites = async () => {
        let response;
        if (isLoggedIn) {
            response = await GetFavourites();
            setFavourites(response || []);
        } else {
            const favs = getFavouritesFromLocalStorage();
            setFavourites(favs);
        }
    };

    fetchFavourites();
    }, [isLoggedIn, getFavouritesFromLocalStorage]);


    if (isLoading || !favourites) {
        return (
     <LoadingSpinner/>
        );
      }

    return(<>
    <ProductRain products={favourites}/>
    </>)
}
export default Favourites;