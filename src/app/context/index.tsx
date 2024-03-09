"use client"

import { Product } from "@/types/product";
import { GetAllProducts } from "@/utils/productService";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ContextType {
    lastAddedItem: Product | null
    cartItems: Product[] | undefined                                                                       
    handleAddToCart: (getCurrentItem: Product, skipNotification?:string) => void;
    getCart: () => void;
    removeFromCart: (product:Product) => void;
    clearLastAddedItem: () => void;
    allProducts: Product[] | undefined;
}

export const Context = createContext<ContextType | null>(null)

function GlobalState({ children }: { children: ReactNode }) {
    
    const cartStorageJSON: string | null = localStorage.getItem('cartDropshippinggod');
    const cartStorage: Product[] = JSON.parse(cartStorageJSON as string) || [];
    const [cartItems, setCartItems] = useState<Product[]>(cartStorage);
    const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>();

    useEffect(() => {
        const cartStorageJSON = typeof window !== "undefined" ? localStorage.getItem('cartDropshippinggod') : null;
        const cartStorage: Product[] = cartStorageJSON ? JSON.parse(cartStorageJSON) : [];
        setCartItems(cartStorage);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('cartDropshippinggod', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    function handleAddToCart(getCurrentItem: Product, skipNotification?:string) {
        setCartItems(currentItems => {
            if (currentItems) {
                if(!skipNotification){
                setLastAddedItem(getCurrentItem);
                }
                return [...currentItems, getCurrentItem];
            } else {
                if(!skipNotification){
                    setLastAddedItem(getCurrentItem);
                    }
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
    
    function clearLastAddedItem() {
        setLastAddedItem(null);
    }
         

    return <Context.Provider value={{lastAddedItem, cartItems, handleAddToCart, getCart, removeFromCart, clearLastAddedItem, allProducts }}>{children}</Context.Provider>
}

export default GlobalState;