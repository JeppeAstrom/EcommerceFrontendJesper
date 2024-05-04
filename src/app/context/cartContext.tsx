"use client";

import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { GetAllProducts, getMainCategories } from "@/utils/productService";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "./authContext";
import { AddToCart, Cart, CartItem, DecreaseItem, DeleteItem, GetCart, ResetCart } from "@/utils/cartService";

interface ContextType {
  lastAddedItem: Product | null;
  cartItems: CartItem[] | undefined;
  handleAddToCart: (getCurrentItem: CartItem, lastAddedItem:Product, skipNotification?: string) => void;
  getCart: () => void;
  removeFromCart: (product: CartItem) => void;
  clearLastAddedItem: () => void;
  allProducts: Product[] | undefined;
  categories: Category[] | undefined;
  getFavouritesFromLocalStorage: () => Product[] | undefined;
  addProductToFavouritesLocalStorage: (product: Product) => void;
  removeProductFromLocalStorage: (product: CartItem) => void;
  resetCart: () => void;
  removeAllOfSameItem: (cartItem: CartItem) => void;
}

export const Context = createContext<ContextType | null>(null);

function CartContext({ children }: { children: ReactNode }) {

  const { isAuthenticated }: any = useContext(AuthContext);


  const [cartItems, setCartItems] = useState<CartItem[] | undefined>();
  const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const GetCartItems = async () => {
    const cartItems = await GetCart();
    if (cartItems) {
      setCartItems(cartItems.items);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const isLoggedin = await isAuthenticated();
      setIsLoggedIn(isLoggedin);
    };

    checkAuthentication();
  }, [isAuthenticated]);

  useEffect(() => {
    if (isLoggedIn) {
    
      GetCartItems();
    }

    if (!isAuthenticated) {
      const cartStorageJSON: string | null = localStorage.getItem(
        "cartDropshippinggod"
      );

      let cartStorage: CartItem[] = [];
      if (cartStorageJSON && cartStorageJSON !== "undefined") {
        try {
          cartStorage = JSON.parse(cartStorageJSON);
        } catch (error) {
      
        }
      }
      setCartItems(cartStorage);
    }

    const fetchProductsAndCategories = async () => {
      const products = await GetAllProducts();
      const categories = await getMainCategories();
      if (products) {
        setAllProducts(products);
      }
      if (categories) {
        setCategories(categories);
      }
    };

    fetchProductsAndCategories();
  }, [isLoggedIn, isAuthenticated]);
 
  useEffect(() => {
    localStorage.setItem("cartDropshippinggod", JSON.stringify(cartItems));
  }, [cartItems]);

  async function handleAddToCart(getCurrentItem:CartItem, lastAddedItem:Product, skipNotification?:string) {
    if (isLoggedIn) {
      const response = await AddToCart(
        getCurrentItem.productId,
        getCurrentItem.name,
        getCurrentItem.imageUrl,
        getCurrentItem.description,
        getCurrentItem.price,
        getCurrentItem.chosenSize
      );
  
      GetCartItems();
      setLastAddedItem(lastAddedItem);
    } else {
      setCartItems((currentItems) => {
        let updatedCartItems = [];
        
        if (currentItems) {
          const existingItemIndex = currentItems.findIndex(item =>
            item.productId === getCurrentItem.productId && item.chosenSize === getCurrentItem.chosenSize
          );
  
          if (existingItemIndex !== -1) {
            updatedCartItems = currentItems.map((item, index) => {
              if (index === existingItemIndex) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
          } else {
            updatedCartItems = [...currentItems, { ...getCurrentItem, quantity: 1 }];
          }
        } else {
          updatedCartItems = [{ ...getCurrentItem, quantity: 1 }];
        }
        if (!skipNotification) {
          setLastAddedItem(lastAddedItem);
        }
  
        return updatedCartItems;
      });
    }
  }
  
  
  
  

  function getCart() {
    return cartItems;
  }

  async function removeAllOfSameItem(cartItem: CartItem) {
    if(isLoggedIn){
      if(cartItem.id){
        const response = await DeleteItem(cartItem.id);
       GetCartItems();
      }
    }
    else{
      if (cartItems) {
        const updatedCart = cartItems.filter(item => item.id !== cartItem.id || item.chosenSize !== cartItem.chosenSize);
        setCartItems(updatedCart);
      } 
    }
  }

  async function removeFromCart(product:CartItem) {
    if (isLoggedIn) {
      if (product.id) {
        const response = await DecreaseItem(product.id);
        GetCartItems();
      }
    } else {
      const index = cartItems?.findIndex(item => item.id === product.id && item.chosenSize === product.chosenSize);
  
      if (index !== undefined && index !== -1 && cartItems) {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
          updatedCartItems[index].quantity -= 1;
        } else {
          updatedCartItems.splice(index, 1);
        }
        setCartItems(updatedCartItems);
      }
    }
  }
  
  function resetCart() {
    setCartItems([]);
    ResetCart();
  }

  const getFavouritesFromLocalStorage = (): Product[] => {
    const favouritesStorageJSON: string | null =
      localStorage.getItem("favouriteProducts");
    if (favouritesStorageJSON) {
      try {
        return JSON.parse(favouritesStorageJSON);
      } catch (error) {
 
      }
    }

    return [];
  };

  function addProductToFavouritesLocalStorage(product: Product) {
    const favouritesStorageJSON = localStorage.getItem("favouriteProducts");
    let favouritesStorage: Product[] = [];

    if (favouritesStorageJSON) {
      try {
        favouritesStorage = JSON.parse(favouritesStorageJSON);
      } catch (error) {
  
        return;
      }
    }
    const productIndex: number = favouritesStorage.findIndex(
      (p) => p.id === product.id
    );

    if (productIndex !== -1) {
      favouritesStorage.splice(productIndex, 1);
    } else {
      favouritesStorage.push(product);
    }
    localStorage.setItem(
      "favouriteProducts",
      JSON.stringify(favouritesStorage)
    );
  }

  const removeProductFromLocalStorage = (product: CartItem) => {
    const favouritesStorageJSON: string | null =
      localStorage.getItem("favouriteProducts");
    let favouritesStorage: Product[] = [];
    if (favouritesStorageJSON && favouritesStorageJSON !== undefined) {
      try {
        favouritesStorage = JSON.parse(favouritesStorageJSON);
        const filteredFavourites = favouritesStorage.filter(
          (p) => p.id !== product.id
        );
        localStorage.setItem(
          "favouriteProducts",
          JSON.stringify(filteredFavourites)
        );
      } catch (error) {
      
      }
    }
  };

  function clearLastAddedItem() {
    setLastAddedItem(null);
  }

  return (
    <Context.Provider
      value={{
        lastAddedItem,
        removeAllOfSameItem,
        resetCart,
        cartItems,
        handleAddToCart,
        getCart,
        removeFromCart,
        clearLastAddedItem,
        allProducts,
        categories,
        getFavouritesFromLocalStorage,
        addProductToFavouritesLocalStorage,
        removeProductFromLocalStorage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default CartContext;
