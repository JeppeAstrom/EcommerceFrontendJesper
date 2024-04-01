
import CloseIcon from "@/app/icons/closeIcon";
import { NextPage } from "next";

interface Props {
    children: any;
    toggleModal: () => void;
    title?: string;
}


const RegistrationModal:NextPage<Props> = ({children, toggleModal, title}) => {


   return(      <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
        <div className="fixed lg:w-[500px] lg:h-[370px] w-full h-full md:w-auto md:h-auto border z-20 bg-white overflow-y-auto">
            <div className="flex justify-between p-2 px-4  border-black items-center">
                <span>{title}</span>
                <CloseIcon onClick={toggleModal} className="w-8 h-8 cursor-pointer justify-center" />
            </div>

            {children}
        </div>
    </div>
</>)
}
export default RegistrationModal;