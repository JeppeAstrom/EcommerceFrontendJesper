import { NextPage } from "next";

interface Props {
  className?: string;
}

const AboutUs: NextPage<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      stroke="black"
      height="25px"
      width="25px"
      version="1.2"
      strokeWidth="0.7"
      baseProfile="tiny"
      id="Layer_1"
      viewBox="0 0 256 256"
    >
      <path d="M129.9,54.3v-13H151V22.1h-21.1v-3.8h-3.8v3.8v19.2v13L81,91.1h94L129.9,54.3z M128,85.2c-5.4,0-9.8-4.4-9.8-9.8  s4.4-9.8,9.8-9.8c5.4,0,9.8,4.4,9.8,9.8S133.4,85.2,128,85.2z M243.5,232l0.2-76H175V95h-47H81v61H12.2l0.2,76H5.3v21.2H128h122.7  V232H243.5z M34.5,224.3h-9.6v-52.1h9.6V224.3z M51.8,224.3h-9.6v-52.1h9.6C51.8,172.2,51.8,224.3,51.8,224.3z M69,224.3h-9.6v-52.1  H69V224.3z M107.9,235.8H94.4V124h13.4L107.9,235.8L107.9,235.8z M134.7,235.8H128h-6.7V124h6.7h6.7V235.8z M161.6,235.8h-13.4V124  h13.4V235.8z M196.6,224.3H187v-52.1h9.6V224.3z M213.8,224.3h-9.6v-52.1h9.6V224.3z M231.1,224.3h-9.6v-52.1h9.6V224.3z" />
    </svg>
  );
};
export default AboutUs;
