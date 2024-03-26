import CloseIcon from "@/app/icons/closeIcon";
import { NextPage } from "next";
import { useRef, useEffect } from "react";

interface Props {
    children: any;
    toggleModal: () => void;
}


const SearchModal:NextPage<Props> = ({children, toggleModal}) => {


   return(<>
     <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
    
    <div  className="fixed top-0 right-0 lg:w-96 w-full h-full border z-20 bg-white overflow-y-auto">
        <div className="flex p-2 border-b border-black items-center">
           <input placeholder="Sök efter produkt" className="w-full rounded-xl border p-2"></input>
           <CloseIcon className="h-8 w-8" onClick={toggleModal}/>
        </div>
        <div className="flex flex-col">
        {children}
        </div>
       
    </div>
    </div>
    </>)
}
export default SearchModal;