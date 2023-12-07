"use client";
import { BikerParcel } from "@/hooks/bikers/useParcels";
import React from "react";
import TodoItem from "./TodoItem";

export interface TodoListProps {
  parcels: BikerParcel[];
  parcelsLoading: boolean;
  fetchParcels: () => Promise<void>;
  hasActions: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  parcels,
  parcelsLoading,
  fetchParcels,
  hasActions,
}) => {
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
              {hasActions && (
                <th className="px-4 py-2 text-left text-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {parcels.map((item) => (
              <TodoItem
                item={item}
                key={item._id}
                fetchParcels={fetchParcels}
                hasActions={hasActions}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoList;
