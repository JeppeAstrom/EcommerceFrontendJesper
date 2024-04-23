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
  
    <div className="flex flex-col gap-3 text-normal font-sans pl-4 pt-3 items-start ">
      {childCategories.map((item, index) => {
        return(
        <Link className={`${item.name === activeRoute ? 'font-semibold border-b border-black' : ''}`} key={index} href={`${pathname}/${item.name}`}>{item.name}</Link>
      )})}
    </div>
  
  );
};
export default SideMenuProductRain;
