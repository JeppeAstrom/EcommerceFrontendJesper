
import { Product } from "@/types/product";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import SearchResultCard from "../searchresultCard";
import { usePathname } from 'next/navigation';
import Search from "@/app/icons/searchicon";
interface Props {
products: Product[];
}


const SearchBar:NextPage<Props> = ({products}) => {
  const pageUrl = usePathname();
    const [activated, setActivated] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>();
    const [searchResult, setSearchresult] = useState<Product[]>();
    useEffect(() => {
        if(inputText){
           const result = products.filter((p) => (p.title.toLowerCase().startsWith(inputText)))  
           setSearchresult(result)
           result && setActivated(true);
        }
       
    },[inputText])
    
    useEffect(() => {
   setActivated(false);
    }, [pageUrl]);

    
    console.log(products)
    console.log(searchResult)
    return(<>

<div className="relative flex items-center border border-gray-500 rounded-xl">
  <input
    onChange={(e) => setInputText(e.target.value)}
    className="text-md h-10 w-full px-4 py-2 rounded-xl bg-transparent font-light"
    placeholder="Sök produkt, kategori eller varumärke"
    value={inputText}
  />
  <Search className="w-8 h-8 absolute right-3" />
</div>


          {inputText && searchResult && activated&& (
             <div className="absolute w-full bg-white p-4 ">
                <div className="grid grid-cols-4 justify-evenly p-2">
                {searchResult.map((product, index) => 
                <SearchResultCard key={index} product={product}/>
                )}
                </div>
            </div>
          )}
         
    </>)
}
export default SearchBar;