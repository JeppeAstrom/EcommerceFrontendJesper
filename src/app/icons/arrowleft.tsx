

import { NextPage } from "next";

interface Props {
    className?:string;
    onClick?: () => void;
    blackArrow?: boolean;
}

const ArrowLeft:NextPage<Props> = ({className, onClick, blackArrow = false}) => {
    return (
<svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
<path d="M5 12H19M5 12L11 6M5 12L11 18" stroke={`${blackArrow ? 'black' : 'white'}`} stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    )
}
export default ArrowLeft;