"use client"

import { Product } from "@/types/product";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ContextType {
    cartItems: Product[] | undefined                                                                       
    handleAddToCart: (getCurrentItem: Product) => void;
    getCart: () => void;
    removeFromCart: (product:Product) => void;
}

export const Context = createContext<ContextType | null>(null)

function GlobalState({ children }: { children: ReactNode }) {
    
    const cartStorageJSON: string | null = localStorage.getItem('cartDropshippinggod');
    const cartStorage: Product[] = JSON.parse(cartStorageJSON as string) || [];
    const [cartItems, setCartItems] = useState<Product[]>(cartStorage);

    useEffect(() => {
        localStorage.setItem('cartDropshippinggod', JSON.stringify(cartItems));
    }, [cartItems]);

    function handleAddToCart(getCurrentItem: Product) {
        setCartItems(currentItems => {
            if (currentItems) {
            
                return [...currentItems, getCurrentItem];
            } else {

                return [getCurrentItem];
            }
        });

    }

    function getCart(){

        return cartItems;                                                               
    }

    function removeFromCart(product: Product) {
        const index = cartItems?.indexOf(product);
        if (index !== undefined && index !== -1 && cartItems) {
            const updatedCartItems = [...cartItems.slice(0, index), ...cartItems.slice(index + 1)];
            setCartItems(updatedCartItems);
        }
    }
    


    const contextValue: ContextType = {
        cartItems,
        handleAddToCart,
        getCart,
        removeFromCart
    };              

    return <Context.Provider value={{cartItems, handleAddToCart, getCart, removeFromCart }}>{children}</Context.Provider>
}

export default GlobalState;