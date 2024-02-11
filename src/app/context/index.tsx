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

    function handleAddToCart(getCurrentItem: Product) {
        setCartItems(currentItems => {
            // If cartItems is not undefined, spread it into a new array and add the new item
            if (currentItems) {
                return [...currentItems, getCurrentItem];
            } else {
                // If cartItems is undefined, start a new array with the item
                return [getCurrentItem];
            }
        });
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