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
      <div className="relative flex items-center border border-gray-500 rounded-xl">
        <input
           ref={inputRef}
           onChange={(e) => setInputText(e.target.value)}
           className="text-md h-10 w-full px-4 py-2 rounded-xl bg-transparent font-light"
           placeholder="Sök produkt, kategori eller varumärke"
           value={inputText}
           onFocus={() => setIsSearchFocused(true)}
        />
        <Search className="w-8 h-8 absolute right-3" />
      </div>
      <div ref={modalRef}>
      {isSearchFocused && searchResult.length > 0 && inputText && (
        <div  className="absolute w-full bg-white p-4 ">
          <div className="grid md:grid-cols-5  grid-cols-3 justify-evenly p-2">
            {searchResult?.map((product, index) => (
              <SearchResultCard key={index} product={product} />
            ))}
          </div>
          
        </div>
      )}
      </div>
    </>
  );
};
export default SearchBar;
