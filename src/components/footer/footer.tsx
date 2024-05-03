'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default  function Footer() {
    const pathname = usePathname()
  return (
    <>
    { pathname !== '/kassa' && (
    <div className="h-[50vh] min-w-full flex py-4 justify-center mt-10  bg-blue-50">
        <div className="w-full flex items-center flex-col">
      <Link
        href="/"
        className="flex p-2 gap-4 font-semibold text-2xl font-sans mt-4 items-center justify-center"
      >
        <Image
          alt="SandlerShop"
          className="w-[50px] h-[40px]"
          width={900}
          height={1300}
          src="https://i.ebayimg.com/images/g/5uUAAOSwI4xa51hh/s-l400.jpg"
        />
        SandlerShop
      </Link>
      <div className="gap-x-14 gap-y-8 lg:gap-20 mt-10 grid grid-cols-2 justify-stretch lg:grid-cols-4">


      <ul className="flex flex-col gap-2 lg:gap-4"> 
  <li className="border-b border-black text-base w-fit">Mina sidor</li>
  <li className="text-sm">Mina köp</li>
  <li className="text-sm">Min varukorg</li>
</ul>

<ul className="flex flex-col gap-2 lg:gap-4">
  <li className="border-b border-black text-base w-fit">Om oss</li>
  <li className="text-sm">Om Sandlershop</li>
  <li className="text-sm">Jobba hos oss</li>
</ul>

<ul className="flex flex-col gap-2 lg:gap-4">
  <li className="border-b border-black text-base w-fit">Miljö</li>
  <li className="text-sm">Tillverkning</li>
  <li className="text-sm">Material</li>
</ul>


<ul className="flex flex-col gap-2 lg:gap-4"> 
  <li className="border-b border-black text-base w-fit">Vanliga frågor</li>
  <li className="text-sm">Leveranser</li>
  <li className="text-sm">Returer</li>
</ul>


      </div>
      </div>
    </div>
   )}
</>
  );
};

