


import { NextPage } from "next";

interface Props {
    className?:string;
    onClick?: () => void;
}

const Hamburger:NextPage<Props> = ({className, onClick}) => {
    return (
        <>
<svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
<path d="M4 6H20M4 12H14M4 18H9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


        </>
    )
}
export default Hamburger;