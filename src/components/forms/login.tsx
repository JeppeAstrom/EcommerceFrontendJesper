
import { NextPage } from "next"

import RegistrationModal from "./registrationModal";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/authContext";


interface Props {
openModal: () => void;
}

const Login:NextPage<Props> = ({openModal}) => {

const handleLoginOrRegister = () => setRegister(prev => !prev);
const [register, setRegister] = useState<boolean>();
const [email, setEmail] = useState<string>();
const [firstName, setFirstName] = useState<string>();
const [lastName, setLastName] = useState<string>();

const [password, setPassword] = useState<string>();
const [verifyPassword, setVerifyPassword] = useState<string>();

const {handleLogin, handleRegister}: any = useContext(AuthContext);

const handleSubmit = async () => {

    if(register){
        console.log("test")
    var result = await handleRegister(firstName, lastName, email,password)
    console.log(result)
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
        <input onChange={(e) => setFirstName(e.target.value)} placeholder="Förnamn" className="w-full rounded-xl border p-3"/>
        <input onChange={(e) => setLastName(e.target.value)} placeholder="Efternamn" className="w-full rounded-xl border p-3"/>
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