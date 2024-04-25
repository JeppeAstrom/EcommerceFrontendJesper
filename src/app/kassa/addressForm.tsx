import LoadingSpinner from "@/components/spinners/loadingSpinner";
import { Address, PostAddress } from "@/utils/addressService";

import { NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {
  handleAddressId: (addressId: number | undefined) => void;
  savedAddress?: Address | null;
}

const AddressForm: NextPage<Props> = ({ handleAddressId, savedAddress }) => {
  const [firstname, setFirstName] = useState<string>();
  const [lastName, setLastname] = useState<string>();
  const [city, setCity] = useState<string>();
  const [street, setStreet] = useState<string>();
  const [postal, setPostal] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    if(savedAddress){
      setFirstName(savedAddress.firstName);
      setLastname(savedAddress.lastName);
      setCity(savedAddress.city);
      setStreet(savedAddress.street);
      setPostal(savedAddress.postalCode);
    }
  },[savedAddress])

  const submitAddress = async () => {
    setIsLoading(true);
    if (firstname && lastName && city && street && postal) {
      const response = await PostAddress(
        firstname,
        lastName,
        street,
        postal,
        city
      );
      if (response) {
        handleAddressId(response);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
    <span className="mb-3 w-fit font-semibold text-lg border-b border-black">Address</span>
  
        <div className='gap-3 flex-col flex mt-4'>
          <form
          onSubmit={(e) => {
            e.preventDefault();
            submitAddress();
          }}
          className="gap-3 flex-col flex"
        >
          <input
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Förnamn - Mottagare"
            className=" border-black border p-2 font-light text-sm"
          />

          <input
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Efternamn - Mottagare"
            className=" border-black border p-2 font-light text-sm"
          />

          <input
            value={street}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Stad"
            className=" border-black border p-2 text-sm font-light"
          />

          <input
            value={city}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Gata"
            className=" border-black border p-2 text-sm font-light"
          />

          <div className="flex w-full gap-3">
            <input
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="Postnummer"
              className=" border-black border p-2 w-3/4 font-light text-sm"
            />

            <button
              type="submit"
              className="w-1/4 bg-black font-semibold text-white"
            >
              {isLoading ? <LoadingSpinner type="Small" /> : "Nästa"}
            </button>
          </div>
        </form>
        </div>
    </>
  );
};
export default AddressForm;
