import { NextPage } from "next";
import Image from "next/image";

interface Props {
title?: string;
image: string;
}

const Campaign:NextPage<Props> = ({title, image}) => {
return(<>
<Image alt="" src={image} width={1300} height={900}/>

</>)
}
export default Campaign