import { NextPage } from "next";

import RegistrationModal from "./registrationModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/authContext";

interface Props {
  openModal: () => void;
}

const Login: NextPage<Props> = ({ openModal }) => {
  const handleLoginOrRegister = () => setRegister((prev) => !prev);
  const [register, setRegister] = useState<boolean>();
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const [password, setPassword] = useState<string>();
  const [verifyPassword, setVerifyPassword] = useState<string>();

  const { handleLogin, handleRegister }: any = useContext(AuthContext);

  const handleSubmit = async () => {
    if (register) {
      var result = await handleRegister(firstName, lastName, email, password);
    } else if (!register) {
      var result = await handleLogin(email,password);
      if(result){
        openModal();
      }
    }
  };
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
  useEffect(() => {
    if(verifyPassword && !isFocused ){
      setShowPasswordError(true);
    }
    else{
      setShowPasswordError(false);
    }
  },[isFocused,verifyPassword])

  return (
    <>
      <RegistrationModal
        title={`${register ? "Skapa nytt konto" : "Logga in"}`}
        toggleModal={openModal}
      >
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit();
          }}
          className="flex flex-col w-full justify-center items-center px-4 h-auto gap-y-3"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full border p-3 font-light"
          />

          {register && (
            <>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Förnamn"
                type="text"
                className="w-full border p-3 font-light"
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Efternamn"
                type="text"
                className="w-full  border p-3 font-light"
              />
            </>
          )}
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lösenord"
            type="password"
            className="w-full border p-3 font-light"
          />
          {register && (
        
            <input
              onChange={(e) => setVerifyPassword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Verifiera lösenord"
              type="password"
              className="w-full border p-3 font-light"
            />
           
         
          )}
          <div className="flex justify-between w-full px-1">
          {showPasswordError && (
              <span className="text-sm font-normal">Lösenord matchar ej</span>
            )}
          <button
            type="button"
            onClick={handleLoginOrRegister}
            className="border-b border-black text-sm font-semibold ml-auto"
          >{`${
            register ? "Redan registrerad? Logga in" : "Inget konto? Registrera"
          }`}</button>
          </div>
          <button
            type="submit"
            className="border w-full p-3 bg-black text-white font-semibold"
          >
            {register ? 'Registrera' : 'Logga in'}
          </button>
        </form>
      </RegistrationModal>
    </>
  );
};
export default Login;
