import { useState, createContext } from "react";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const resetAddress = {
    name: "",
    street: "",
    city: "",
    zipcode: "",
    state: "",
    country: "",
    mobile: "",
  };

  const initialAddress = {
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
        addressData, setAddressData, resetAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};