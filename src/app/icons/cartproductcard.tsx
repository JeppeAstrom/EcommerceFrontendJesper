import { NextPage } from "next";

interface Props {
  className?: string;
  quickshop?: () => void;
  cartCount?: number;
  showCount?: boolean;
}

const CartProductCard: NextPage<Props> = ({ className, quickshop }) => {
  return (
    <svg
      className={className}
      onClick={quickshop}
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 24 24"
      version="1.1"
    >
      <g
        id="Basket"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <rect id="Container" x="0" y="0" width="24" height="24"></rect>
        <path
          d="M4,10 L20,10 L20,16 C20,18.209139 18.209139,20 16,20 L8,20 C5.790861,20 4,18.209139 4,16 L4,10 L4,10 Z"
          id="shape-1"
          stroke="#030819"
          stroke-width="0.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="0,0"
        ></path>
        <path
          d="M7,4 L17,4 L17,5 C17,7.76142375 14.7614237,10 12,10 C9.23857625,10 7,7.76142375 7,5 L7,4 L7,4 Z"
          id="shape-2"
          stroke="#030819"
          stroke-width="0.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="0,0"
          transform="translate(12.000000, 7.000000) scale(1, -1) translate(-12.000000, -7.000000) "
        ></path>
        <line
          x1="12"
          y1="13"
          x2="12"
          y2="17"
          id="shape-3"
          stroke="#030819"
          stroke-width="0.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="0,0"
        ></line>
        <line
          x1="16"
          y1="13"
          x2="16"
          y2="17"
          id="shape-4"
          stroke="#030819"
          stroke-width="0.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="0,0"
        ></line>
        <line
          x1="8"
          y1="13"
          x2="8"
          y2="17"
          id="shape-5"
          stroke="#030819"
          stroke-width="0.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="0,0"
        ></line>
      </g>
    </svg>
  );
};
export default CartProductCard;
