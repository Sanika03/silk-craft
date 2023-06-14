import { useState, createContext } from "react";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const resetAddress = {
    id: "",
    name: "",
    street: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
    mobile: "",
  };

  const initialAddress = {
    id: "0",
    name: "Adarsh Balika",
    street: "123 Main Street",
    city: "Aurangabad",
    zipcode: "431001",
    state: "Maharashtra",
    country: "India"
  }

  const [addressData, setAddressData] = useState({
    address: [initialAddress],
    selectedAddress: initialAddress
  });

  return (
    <AddressContext.Provider
      value={{
        addressData, setAddressData, resetAddress, initialAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};