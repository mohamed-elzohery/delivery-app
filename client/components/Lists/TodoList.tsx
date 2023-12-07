import useParcels from "@/hooks/bikers/useParcels";
import React from "react";

const TodoList = () => {
  const { parcels, parcelsLoading } = useParcels();
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
              <th className="px-4 py-2 text-left text-gray-600">
                Dropoff Address
              </th>
              <th className="px-4 py-2 text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((item, index) => (
              <tr
                key={item._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.pickupAddress}</td>
                <td className="border px-4 py-2">{item.dropoffAddress}</td>
                <td className="border px-4 py-2 capitalize">
                  <span>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoList;
