"use client"

import { Product } from "@/types/product";
import { ReactNode, createContext, useState } from "react";

interface ContextType {
    cartItems: Product[] | undefined                                                                       
    handleAddToCart: (getCurrentItem: Product) => void;
    getCart: () => void;
}

export const Context = createContext<ContextType | null>(null)

function GlobalState({ children }: { children: ReactNode }) {
    
    const [cartItems, setCartItems] = useState<Product[]>();

    function handleAddToCart(getCurrentItem:Product){
        const cart:Product[] | undefined =  cartItems

        if(cart){
        cart.push(getCurrentItem);
        setCartItems(cart)
        }
        else{
        const productArray:Product[] = [];
        productArray.push(getCurrentItem);
        setCartItems(productArray);
        }
    
    }

    function getCart(){

        return cartItems;                                                               
    }

    const contextValue: ContextType = {
        cartItems,
        handleAddToCart,
        getCart
    };              

    return <Context.Provider value={{cartItems, handleAddToCart, getCart }}>{children}</Context.Provider>
}

export default GlobalState;