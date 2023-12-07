"use client";
import { ParcelStatus } from "@/api/Parcel/updateParcel";
import useParcels from "@/hooks/bikers/useParcels";
import React from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { parcels, parcelsLoading, fetchParcels } = useParcels();
  const parcelCount = parcels.length;

  if (parcelsLoading) return <h1>Imagine a spinner</h1>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Avaliable Parcels</h1>
      <h3 className="text-2xl font-bold text-center mb-6">
        parcels count: {parcelCount}
      </h3>
      {parcelCount === 0 ? (
        <p>No parcels to show</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-gray-600">
                Pickup Address
              </th>
              <th className="px-4 py-2 text-left text-gray-600">Pickup Time</th>
              <th className="px-4 py-2 text-left text-gray-600">
                Dropoff Address
              </th>
              <th className="px-4 py-2 text-left text-gray-600">
                Dropoff Time
              </th>
              <th className="px-4 py-2 text-left text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-gray-600">actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((item) => (
              <TodoItem
                item={item}
                key={item._id}
                fetchParcels={fetchParcels}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoList;
