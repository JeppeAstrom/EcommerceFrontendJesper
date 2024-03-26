import CloseIcon from "@/app/icons/closeIcon";
import { NextPage } from "next";

interface Props {
    children: any;
    toggleModal: () => void;
    title?: string;
}


const Modal:NextPage<Props> = ({children, toggleModal, title}) => {


   return(<>
     <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
    <div className="fixed top-0 right-0 lg:w-96 w-full h-full border z-20 bg-white overflow-y-auto">
        <div className="flex justify-between p-2 border-b border-black items-center">
            <span>{title}</span>
            <CloseIcon onClick={toggleModal}  className="w-8 h-8 cursor-pointer justify-center"/>
        </div>
    
        {children}
    </div>
    </div>
    </>)
}
export default Modal;