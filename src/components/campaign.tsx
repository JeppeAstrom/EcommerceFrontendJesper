import { NextPage } from "next";
import Image from "next/image";

interface Props {
image: string;
}

const Campaign:NextPage<Props> = ({image}) => {
return(<div className="flex items-center justify-center ">
<Image alt="" src={image} width={1300} height={900}/>

</div>)
}
export default Campaign