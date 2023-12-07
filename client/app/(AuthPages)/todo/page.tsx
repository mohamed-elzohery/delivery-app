"use client";
import React from "react";
import TodoList from "@/components/Lists/Todo/TodoList";
import useParcels from "@/hooks/bikers/useParcels";
import { Roles } from "@/app/login/page";

const Page = () => {
  const { parcels, fetchParcels, parcelsLoading } = useParcels(Roles.BIKER);
  return (
    <TodoList
      hasActions={true}
      parcels={parcels}
      fetchParcels={fetchParcels}
      parcelsLoading={parcelsLoading}
    />
  );
};

export default Page;
