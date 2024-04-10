
import { NextPage } from "next"

import RegistrationModal from "./registrationModal";
import { useState } from "react";
import Authentication from "@/app/context/authProvider";

interface Props {
openModal: () => void;
}

const Login:NextPage<Props> = ({openModal}) => {

const handleLoginOrRegister = () => setRegister(prev => !prev);
const [register, setRegister] = useState<boolean>();
const [email, setEmail] = useState<string>();
const [userName, setUsername] = useState<string>();
const [password, setPassword] = useState<string>();
const [verifyPassword, setVerifyPassword] = useState<string>();


const { handleLogin, handleRegister }:any = Authentication;

const handleSubmit = async () => {

    if(register){
    var result = await handleRegister()
    }
    else if(!register){
    var result = await handleLogin() 
    }
}


    return(<>
    <RegistrationModal title={`${register ? 'Skapa nytt konto': 'Logga in'}`} toggleModal={openModal}>
        <form method="post" onSubmit={(e) => {
            e.preventDefault();
           void handleSubmit()}} className="flex flex-col w-full justify-center items-center px-4 h-auto gap-y-2">
        {register && (
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border p-3"/>
        )}
        <input onChange={(e) => setUsername(e.target.value)} placeholder="Användarnamn" className="w-full rounded-xl border p-3"/>
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord" className="w-full rounded-xl border p-3"/>
        {register && (
        <input onChange={(e) => setVerifyPassword(e.target.value)} placeholder="Verifiera lösenord" className="w-full rounded-xl border p-3"/>
        )}
        <button type="button" onClick={handleLoginOrRegister} className="border-b border-black">{`${register ? 'Redan registrerad? Logga in' : 'Inget konto? Registrera'}`}</button>
        <button type="submit" className="bg-red-300 p-2 w-full absolute bottom-0">Nästa</button>
        </form>
      
    </RegistrationModal>
    </>)
}
export default Login