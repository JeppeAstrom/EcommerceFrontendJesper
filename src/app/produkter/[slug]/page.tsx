/* eslint-disable @next/next/no-img-element */
'use client'
import { useContext, useEffect, useState } from "react";
import { Context } from "@/app/context";
import { GetProduct } from "@/utils/productService";
import { Product } from "@/types/product";
import { usePathname } from "next/navigation"; // Import from next/navigation instead of next/router

const ProductPage = () => {
    const { handleAddToCart }:any= useContext(Context);
    const pageUrl = usePathname();
    const id = pageUrl.split('/').pop(); // Extract the id from the URL path

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const fetchedProduct: Product = await GetProduct(id);
                    setProduct(fetchedProduct);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
        };
        fetchData();
    }, [id]);

    if (!product) {
        return <div className="flex items-center justify-center h-full w-full">Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="grid lg:grid-cols-2 flex-col lg:w-1/2 w-full">
                <div className="p-8">
                    <figure className="aspect-w-9 aspect-h-13 overflow-hidden lg:h-[400px]">
                        <img className="w-full h-full object-fit" src={product.image} alt={product.title} />
                    </figure>
                </div>
                <div className="lg:p-8 relative">
                    <span className="line-clamp-1 border-b border-black text-lg">{product.title}</span>
                    <div className="mt-2">
                        <span className="mt-4 text-sm line-clamp-8">{product.description}</span>
                        <div className="flex justify-between pt-4">
                        <button onClick={() => handleAddToCart(product)} className="right-0 w-[150px] h-[50px] rounded-xl bg-amber-400">Köp</button>
                        <button className="">{product.price}kr</button>
                    </div>
                    </div>
                 
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
