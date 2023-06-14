import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AddressContext } from "../contexts/addressContext";

import "../styles/userAddress.css";

export const AddressPage = () => {
    const { addressData, setAddressData, resetAddress } = useContext(AddressContext);
    const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);
    const [newAddress, setNewAddress] = useState(resetAddress);
    const [isFormValid, setIsFormValid] = useState(true);
  
    const navigate = useNavigate();
  
    const handleAddAddress = () => {
      if (isAddressValid()) {
        setAddressData((prevData) => ({
          ...prevData,
          address: [...prevData.address, newAddress],
        }));  
        setNewAddress(resetAddress);
        setShowAddAddressPopup(false);
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };
  
    const handleSelectAddress = (address) => {
      setAddressData((prevData) => ({
        ...prevData,
        selectedAddress: address,
      }));
    };
  
    const isAddressValid = () => {
      return (
        newAddress.name &&
        newAddress.street &&
        newAddress.city &&
        newAddress.zipcode &&
        newAddress.state &&
        newAddress.country
      );
    };

    const handleCancel = () => {
        setShowAddAddressPopup(false)
        setIsFormValid(true);
    }

    const handleGoToNext = () => {
     if(addressData.address.includes(addressData.selectedAddress)) {
      navigate("/checkout/orderSummary")
     } else {
      toast.info('Please select an address')
     }
    }

    const getAddressPage = () => <div className="address-container">
        <h2>Shipping Address</h2>
        <p>Choose from saved addresses:</p>
        <div>
        {addressData?.address?.map((address, index) => (
            <div
            key={index}
            style={{
                border: address === addressData.selectedAddress ? "2px solid black" : "1px solid gray"
            }}
            onClick={() => handleSelectAddress(address)}
            className="address-select-container"
            >
            {Object.entries(address).map(([key, value], index) => (
              index !== 0 && <div key={key}>{value}</div>
            ))}
            </div>
        ))}
        </div>

        {showAddAddressPopup && (
        <div className="add-address-container">
            {isFormValid || <div style={{ color: "red" }}>All fields are required.</div>}
            <input
            className="address-input"
            required
            type="text"
            placeholder="Name"
            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
            />
            <input
            className="address-input"
            required
            type="text"
            placeholder="Street"
            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            />
            <input
            className="address-input"
            required
            type="text"
            placeholder="City"
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
            <input
            className="address-input"
            required
            type="number"
            placeholder="Zipcode"
            onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })}
            />
            <input
            className="address-input"
            required
            type="text"
            placeholder="State"
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            />
            <input
            className="address-input"
            required
            type="text"
            placeholder="Country"
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            />
            <button onClick={() => handleAddAddress()} className="address-action-button">Add</button>
            <button onClick={() => handleCancel()} className="address-action-button">Cancel</button>
        </div>
        )}

        <button onClick={() => setShowAddAddressPopup(true)} className="address-action-button final">Add Address</button>
        <button onClick={() => handleGoToNext()} className="address-action-button final">Next</button>
    </div>
  
    return (
      <div className="address-page">
        {getAddressPage()}
      </div>
    );
  };
  