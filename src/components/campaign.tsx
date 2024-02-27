import { NextPage } from "next";

interface Props {
title?: string;
image: string;
}

const Campaign:NextPage<Props> = ({title, image}) => {
return(<>
<img src={image}/>

</>)
}
export default Campaign