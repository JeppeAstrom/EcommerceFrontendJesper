"use client"

import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { GetAllProducts, getMainCategories } from "@/utils/productService";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ContextType {
    lastAddedItem: Product | null
    cartItems: Product[] | undefined                                                                       
    handleAddToCart: (getCurrentItem: Product, skipNotification?:string) => void;
    getCart: () => void;
    removeFromCart: (product:Product) => void;
    clearLastAddedItem: () => void;
    allProducts: Product[] | undefined;
    categories: Category[] | undefined
}

export const Context = createContext<ContextType | null>(null)

function GlobalState({ children }: { children: ReactNode }) {
    
  
   
    const [cartItems, setCartItems] = useState<Product[] | undefined>();
    const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {

        const cartStorageJSON: string | null = localStorage.getItem('cartDropshippinggod');
        

        let cartStorage: Product[] = [];
        if (cartStorageJSON && cartStorageJSON !== "undefined") {
            try {
                cartStorage = JSON.parse(cartStorageJSON);
            } catch (error) {
                console.error("Error parsing cart storage JSON:", error);
   
                cartStorage = [];
            }
        }
        setCartItems(cartStorage);

        const fetchProductsAndCategories = async () => {
            const products = await GetAllProducts();
            const categories = await getMainCategories();
            if (products) {
                setAllProducts(products);
            }
            if(categories){
                setCategories(categories);
            }
        };

        fetchProductsAndCategories();
    }, []);

    useEffect(() => {
        localStorage.setItem('cartDropshippinggod', JSON.stringify(cartItems));
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
         

    return <Context.Provider value={{lastAddedItem, cartItems, handleAddToCart, getCart, removeFromCart, clearLastAddedItem, allProducts, categories }}>{children}</Context.Provider>
}

export default GlobalState;