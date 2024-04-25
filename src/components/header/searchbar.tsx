import { Product } from "@/types/product";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import SearchResultCard from "../searchresultCard";
import { usePathname } from "next/navigation";
import Search from "@/app/icons/searchicon";
interface Props {
  products: Product[];
}

const SearchBar: NextPage<Props> = ({ products }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Adjusted type
  const pageUrl = usePathname();
  const [inputText, setInputText] = useState<string>();
  const [searchResult, setSearchresult] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  useEffect(() => {
    if (inputText) {
      const result = products.filter((p) =>
        p.name.toLowerCase().includes(inputText.toLowerCase())
      );
      setSearchresult(result);
    } else {
      setSearchresult([]);
    }
  }, [inputText, products]);

  useEffect(() => {
    setInputText("");
  }, [pageUrl]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current && !modalRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="relative flex items-center border border-black mt-0 lg:mt-1">
      <Search className="w-7 h-7 absolute left-1" />
        <input
         style={{boxShadow:'none', border: '0px solid black', outline: 'none'}}
           ref={inputRef}
           onChange={(e) => setInputText(e.target.value)}
           className={`text-md h-10 w-full px-4 py-2 md:text-start md:ml-8 ml-6 bg-transparent font-light text-sm md:text-base`}
           placeholder="Sök efter produkter, kategorier, varumärken.."
           value={inputText}
           onFocus={() => setIsSearchFocused(true)}
        />
      
      </div>
      <div ref={modalRef}>
      {isSearchFocused && searchResult.length > 0 && inputText && (
        <div  className="absolute w-full bg-white pb-2 px-1">
          <div className="grid md:grid-cols-5  grid-cols-3 justify-evenly p-2">
            {searchResult?.map((product, index) => (
              <SearchResultCard key={index} product={product} />
            )).slice(0, 6)}
          </div>
          
        </div>
      )}
      </div>
    </>
  );
};
export default SearchBar;
