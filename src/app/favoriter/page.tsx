'use client'
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/cartContext";
import { Product } from "@/types/product";
import ProductRain from "@/components/productrain";
import { AuthContext } from "../context/authContext";
import { GetFavourites } from "@/utils/favouriteService";
import LoadingSpinner from "@/components/spinners/loadingSpinner";

const Favourites = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { isAuthenticated }: any = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
      const checkAuthentication = async () => {
        const isLoggedin = await isAuthenticated();
        if(!isLoggedIn){
            setIsLoading(false);
        }
        setIsLoggedIn(isLoggedin);
      };
  
      checkAuthentication();
    }, [isAuthenticated]);
  



    const {getFavouritesFromLocalStorage}: any = useContext(Context);
    const [favourites, setFavourites] = useState<Product[]>([]);

    useEffect(() => {
       const fetchFavourites = async () => {
        const response = await GetFavourites();
        if(response){
            setFavourites(response);
        }
        setIsLoading(false);
     
        }
        if(isLoggedIn){
         
           fetchFavourites();
        }
        else{
        const favs = getFavouritesFromLocalStorage();
        setFavourites(favs);
    }
    }, [isAuthenticated, isLoggedIn, favourites]);

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