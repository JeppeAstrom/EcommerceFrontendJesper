


import { NextPage } from "next";

interface Props {
    className?:string;
    isOrderHistoryCard?:boolean
}

const Plus:NextPage<Props> = ({className, isOrderHistoryCard = false}) => {
    return (
        <>
<svg className={className} xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
<path d="M4 12H20M12 4V20" stroke={`${isOrderHistoryCard ? 'white' : '#000000'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </>
    )
}
export default Plus;