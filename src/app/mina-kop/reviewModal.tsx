
import CloseIcon from "@/app/icons/closeIcon";
import { NextPage } from "next";
import { useEffect, useRef } from "react";

interface Props {
    children: any;
    toggleModal: () => void;
    title?: string;
}


const ReviewModal:NextPage<Props> = ({children, toggleModal, title}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            modalRef.current && !modalRef.current.contains(event.target as Node) 
          ) {
            toggleModal();
          }
        };
    
        document.addEventListener("click", handleClickOutside);
    
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, [toggleModal]);
   return( <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
        <div ref={modalRef} className="fixed lg:w-[600px] lg:h-[400px] pb-4 sm:w-[400px] md:w-[500px] md:h-auto border z-20 bg-white overflow-y-auto">
            <div className="flex justify-between p-2 px-4  border-black items-center">
                <span className="font-semibold text-lg line-clamp-1">{title}</span>
                <CloseIcon onClick={toggleModal} className="w-8 h-8 cursor-pointer justify-center" />
            </div>

            {children}
        </div>
    </div>
</>)
}
export default ReviewModal;