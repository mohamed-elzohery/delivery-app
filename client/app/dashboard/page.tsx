import { redirect } from "next/navigation";
import isAuthorized, { SystemRoles } from "../utils/isAuthorized";
import React from "react";

const StatusColorEnum: { [key in string]: string } = {
  pending: "bg-blue-600",
  "picked up": "bg-yellow-600",
  delivered: "bg-green-600",
};

const parcels = [
  {
    id: "ass",
    name: "hello world parcel",
    pickupAddress: "dsaa",
    dropoffAddress: "asassas",
    status: "pending",
  },
  {
    id: "dadad",
    name: "hello world parcel",
    pickupAddress: "dsaa",
    dropoffAddress: "asassas",
    status: "picked up",
  },
  {
    id: "rerererer",
    name: "hello world parcel",
    pickupAddress: "dsaa",
    dropoffAddress: "asassas",
    status: "pending",
  },
  {
    id: "yryry",
    name: "hello world parcel",
    pickupAddress: "dsaa",
    dropoffAddress: "asassas",
    status: "picked up",
  },
  {
    id: "aooooioiss",
    name: "hello world parcel",
    pickupAddress: "dsaa",
    dropoffAddress: "asassas",
    status: "delivered",
  },
];
const Page = async () => {
  const isAllowable = await isAuthorized(SystemRoles.SENDER);
  console.log(isAllowable, "isAllowd");
  if (!isAllowable) redirect("/login");

  return (
    <div className="flex  justify-center h-screen">
      <div className="w-full md:max-w-[80%]">
        <h1 className="text-2xl font-bold text-center my-4">
          Sender Dashboard
        </h1>

        <table className="mt-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Pickup Address</th>
              <th className="px-6 py-3">Dropoff Address</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr
                key={parcel.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {parcel.name}
                </td>
                <td className="px-6 py-4">{parcel.pickupAddress}</td>
                <td className="px-6 py-4">{parcel.dropoffAddress}</td>
                <td className="px-6 py-4">
                  <span
                    className={`p-2 ${
                      StatusColorEnum[parcel.status]
                    }  rounded-md text-white text-md font-bold shadow-sm capitalize`}
                  >
                    {parcel.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
