import createParcel from "@/api/Parcel/createParcel";
import { ParcelStatus, updateParcel } from "@/api/Parcel/updateParcel";
import useFormData from "@/hooks/bikers/useFormData";
import React, { useState } from "react";

export interface CreateParcelForm {
  closeModal: () => void;
  fetchParcels: () => Promise<void>;
}

const CreateParcelForm: React.FC<CreateParcelForm> = ({
  closeModal,
  fetchParcels,
}) => {
  const { errors, formData, handleInputChange, setErrors } = useFormData({
    pickupAddress: "",
    dropoffAddress: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setErrors([]);
      const { dropoffAddress, name, pickupAddress } = formData;
      await createParcel({
        dropoffAddress,
        name,
        pickupAddress,
      });
      closeModal();
      fetchParcels();
    } catch (err) {
      setErrors([err as string]);
    } finally {
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <form className="w-[500px] p-8 space-y-4" onSubmit={handleSubmit}>
      <div className="inset-y-0  flex items-center ps-3.5 pointer-events-none mt-4">
        <label className="text-gray-600 text-2xl" htmlFor="name">
          Parcel Name
        </label>
      </div>
      <input
        required={true}
        minLength={3}
        onChange={handleInputChange}
        id="name"
        name="name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter Name"
      />
      <div className="inset-y-0 flex items-center ps-3.5 pointer-events-none w-md">
        <label className="text-gray-600 text-2xl" htmlFor="pickup-address">
          Pickup Address
        </label>
      </div>
      <input
        id="pickup-address"
        required={true}
        onChange={handleInputChange}
        name="pickupAddress"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter address"
      />
      <div className="inset-y-0  flex items-center ps-3.5 pointer-events-none mt-4">
        <label className="text-gray-600 text-2xl" htmlFor="dropoff-date">
          Dropoff date
        </label>
      </div>
      <input
        required={true}
        onChange={handleInputChange}
        id="dropoffAddress"
        name="dropoffAddress"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter Address"
      />

      <ul>
        {errors.map((error) => (
          <li
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
            key={error}
          >
            <span className="font-medium">{error}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end items-center space-x-3">
        <button
          onClick={handleCancel}
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CreateParcelForm;
