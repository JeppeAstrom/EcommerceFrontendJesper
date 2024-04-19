"use client";
import Link from "next/link";
import { NextPage } from "next";
type MenuItem = {
  title: string;
  href: string;
};
interface Props {
  sideMenuItems: MenuItem[];
  activeRoute?: string;
}
const SideNavigation: NextPage<Props> = ({ sideMenuItems, activeRoute }) => {



  return (
    <div className="flex flex-col gap-3 text-normal font-sans pl-4 pt-3 items-start">
      {sideMenuItems.map((item, index) => (
        <Link className={`${item.href === activeRoute ? 'font-semibold border-b border-black' : ''}`} key={index} href={item.href}>{item.title}</Link>
      ))}
    </div>
  );
};
export default SideNavigation;
