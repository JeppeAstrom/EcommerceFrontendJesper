"use client";
import Link from "next/link";
import { NextPage } from "next";
import { ChildCategories } from "@/utils/productService";
import { usePathname, useSearchParams } from 'next/navigation'
type MenuItem = {
  title: string;
  href: string;
};
interface Props {
childCategories?: ChildCategories[]
activeRoute?: string;
}
const SideMenuProductRain: NextPage<Props> = ({ childCategories, activeRoute }) => {
  const pathname = usePathname()
 
if(!childCategories){
    return;
}
  return (
  
    <div className="flex lg:flex-col flex-row mt-4 item-center gap-3 text-normal font-sans pl-4 items-start ">
      {childCategories.map((item, index) => {
        return(
        <Link className={`sm:max-lg:border sm:max-lg:border-gray-500 sm:max-lg:p-3 sm:max-lg:px-5  ${item.name === activeRoute ? 'font-light border-b border-black' : 'font-light'}`} key={index} href={`${pathname}/${item.name}`}>{item.name}</Link>
      )})}
    </div>
  
  );
};
export default SideMenuProductRain;
