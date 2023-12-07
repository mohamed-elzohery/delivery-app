"use client";
import React from "react";
import useParcels from "@/hooks/bikers/useParcels";
import { Roles } from "../login/page";
import TodoList from "@/components/Lists/Todo/TodoList";

export const StatusColorEnum: { [key in string]: string } = {
  pending: "bg-blue-600",
  "picked up": "bg-yellow-600",
  delivered: "bg-green-600",
};

const Page = () => {
  const { parcels, parcelsLoading, fetchParcels } = useParcels(Roles.Sender);

  return (
    <div className="flex justify-center h-screen">
      <div className="w-full md:max-w-[80%]">
        <h1 className="text-2xl font-bold text-center my-4">
          Sender Dashboard
        </h1>
        <TodoList
          hasActions={false}
          fetchParcels={fetchParcels}
          parcels={parcels}
          parcelsLoading={parcelsLoading}
        />
      </div>
    </div>
  );
};

export default Page;
