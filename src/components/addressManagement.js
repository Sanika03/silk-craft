import isEqual from 'lodash/isEqual';
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AddressContext } from '../contexts/addressContext';

export const AddressManagement = () => {    
    const { addressData, setAddressData, resetAddress } = useContext(AddressContext);
    const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);
    const [newAddress, setNewAddress] = useState(resetAddress);
    const [isFormValid, setIsFormValid] = useState(true);
  
    const handleAddAddress = () => {
      if (isAddressValid()) {
        if (newAddress.id >= 0 && newAddress.id < addressData.address.length && newAddress.id !== "") {
          setAddressData((prevData) => {
            const updatedAddress = [...prevData.address];
            updatedAddress[newAddress.id] = newAddress;
            if (isEqual(newAddress, addressData.selectedAddress)) {
              return { ...prevData, address: updatedAddress, selectedAddress: updatedAddress };
            } else {
              return { ...prevData, address: updatedAddress };
            }
          });
        } else {
          setAddressData((prevData) => ({
            ...prevData,
            address: [...prevData.address, newAddress],
          }));
        }
        setNewAddress(resetAddress);
        setShowAddAddressPopup(false);
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
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
        setNewAddress(resetAddress)
    }

    const handleEditAddress = (index) => {
      setNewAddress({ ...addressData.address[index], id: index });
      setShowAddAddressPopup(true);
    };    

    const handleDeleteAddress = (index) => {
      const editedAddress = { ...addressData.address[index], id: index };
      if (isEqual(editedAddress, addressData.selectedAddress)) {
        setAddressData((prevData) => {
          const updatedAddress = [...prevData.address];
          updatedAddress.splice(index, 1);
          return { address: updatedAddress, selectedAddress: {} };
      })
      } else {
          setAddressData((prevData) => {
          const updatedAddress = [...prevData.address];
          updatedAddress.splice(index, 1);
          return ({ ...prevData, address: updatedAddress});
        })
    }}

    const getAddressPage = () => <div>
        <div>
          {addressData?.address?.map((address, index) => (
            <div
              key={index}
              style={{
                border: "1px solid gray"
              }}
              className="address-select-container"
            >
              {Object.values(address).slice(1, -1).join(", ")}
              <div className="customize-address-container">
                <button className="icons" onClick={() => handleEditAddress(index)}><FontAwesomeIcon icon={faPenToSquare}/></button>
                <button className="icons" onClick={() => handleDeleteAddress(index)}><FontAwesomeIcon icon={faTrash}/></button>
              </div>
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
            value={newAddress.name}
            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
            />
            <input
            className="address-input"
            required
            type="text"
            placeholder="Street"
            value={newAddress.street}
            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            />
            <input
            className="address-input"
            required
            type="text"
            placeholder="City"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
            <input
            className="address-input"
            required
            type="number"
            placeholder="Zipcode"
            value={newAddress.zipcode}
            onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })}
            />
            <input
            className="address-input"
            required
            type="text"
            placeholder="State"
            value={newAddress.state}
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            />
            <input
            className="address-input"
            required
            type="text"
            placeholder="Country"
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            />
            <button onClick={() => handleAddAddress()} className="address-action-button">Add</button>
            <button onClick={() => handleCancel()} className="address-action-button">Cancel</button>
        </div>
        )}
    </div>

  return (
    <>
      <div className="address-head">
            <p className="address-title">Addresses</p>
            <button onClick={() => setShowAddAddressPopup(true)} className="add-address-btn">+ Add</button>
      </div>
      {getAddressPage()}
    </>
  )
}