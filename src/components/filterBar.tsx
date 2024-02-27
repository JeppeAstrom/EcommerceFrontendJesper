import { NextPage } from "next";

interface Props{
handlerCategory: (value:string|undefined) => void;
currentCategory: string | undefined;
}

const categories:string[] = ["electronics",
"jewelery",
"men's clothing",
"women's clothing"]

const FilterBar:NextPage<Props> = ({handlerCategory,currentCategory}) => {

    

    return(<>
    <div className="shadow-lg h-[800px]">
        <div className="p-4 items-center justify-center flex">
            <input className="w-full h-10 border p-2 shadow-md rounded-lg" placeholder="Sök"/>
            <div className="flex items-center justify-center">
  {categories.map((category, index) => (
       <span onClick={() => handlerCategory(category)}    className={"border text-sm" + (currentCategory ? (currentCategory === category && " p-2 border-black") : "")}  key={index}>{category}</span>
   ))}
    <span onClick={() => {
      handlerCategory(undefined);
      }} className="border text-sm w-auto">Alla</span>
      </div>
        </div>
    </div>
    </>)
}
export default FilterBar;