import { ParcelStatus } from "@/api/Parcel/updateParcel";
import PickupParcelForm from "@/components/LoginForm/PickupParcelForm";
import Modal from "@/components/UI/Modals/Modal";
import useModal from "@/hooks/bikers/useModal";
import { formatDateString } from "@/utils/Date/formatter";
import React from "react";

interface TodoItemProps {
  item: {
    _id: string;
    name: string;
    pickupAddress: string;
    pickupTimestamp: string;
    dropoffAddress: string;
    dropoffTimestamp: string;
    status: ParcelStatus; // You might want to use an enum or constants for status
  };
  fetchParcels: () => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item: {
    _id,
    dropoffAddress,
    dropoffTimestamp,
    name,
    pickupAddress,
    pickupTimestamp,
    status,
  },
  fetchParcels,
}) => {
  const { isModalOpen, closeModal, openModal } = useModal();

  const handlePickupClick = () => {
    openModal();
  };
  return (
    <tr className="bg-white">
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{pickupAddress}</td>
      <td className="border px-4 py-2">{formatDateString(pickupTimestamp)}</td>
      <td className="border px-4 py-2">{dropoffAddress}</td>
      <td className="border px-4 py-2">{formatDateString(dropoffTimestamp)}</td>
      <td className="border px-4 py-2 capitalize">{status}</td>
      <td className="border px-4 py-2 capitalize">
        {status === ParcelStatus.PENDING && (
          <button
            type="button"
            onClick={handlePickupClick}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            pickup
          </button>
        )}
      </td>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <PickupParcelForm
            id={_id}
            closeModal={closeModal}
            fetchParcels={fetchParcels}
          />
        </Modal>
      )}
    </tr>
  );
};

export default TodoItem;
