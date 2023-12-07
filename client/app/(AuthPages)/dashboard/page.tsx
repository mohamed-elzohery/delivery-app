"use client";
import React from "react";
import useParcels from "@/hooks/bikers/useParcels";
import { Roles } from "../../login/page";
import TodoList from "@/components/Lists/Todo/TodoList";
import useModal from "@/hooks/bikers/useModal";
import Modal from "@/components/UI/Modals/Modal";
import CreateParcelForm from "@/components/Forms/CreateParcelForm";

export const StatusColorEnum: { [key in string]: string } = {
  pending: "bg-blue-600",
  "picked up": "bg-yellow-600",
  delivered: "bg-green-600",
};

const Page = () => {
  const { parcels, parcelsLoading, fetchParcels } = useParcels(Roles.Sender);
  const { closeModal, isModalOpen, openModal } = useModal();

  const handleAddBtnClick = () => {
    openModal();
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="w-full md:max-w-[80%]">
        <h1 className="text-2xl font-bold text-center my-4">
          Sender Dashboard
        </h1>
        <button
          onClick={handleAddBtnClick}
          type="button"
          className="block mx-auto uppercase px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          add parcel
        </button>
        <TodoList
          hasActions={false}
          fetchParcels={fetchParcels}
          parcels={parcels}
          parcelsLoading={parcelsLoading}
        />
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <CreateParcelForm
              closeModal={closeModal}
              fetchParcels={fetchParcels}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Page;
