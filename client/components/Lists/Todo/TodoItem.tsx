import { ParcelStatus } from "@/api/Parcel/updateParcel";
import { StatusColorEnum } from "@/app/dashboard/page";
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
  hasActions: boolean;
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
  hasActions,
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
      <td className="border px-6 py-4">
        <span
          className={`p-2 ${StatusColorEnum[status]}  rounded-md text-white text-md font-bold shadow-sm capitalize`}
        >
          {status}
        </span>
      </td>
      {hasActions && (
        <td className="border capitalize mx-auto">
          {status === ParcelStatus.PENDING && (
            <button
              type="button"
              onClick={handlePickupClick}
              className="flex focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              pickup
            </button>
          )}
        </td>
      )}
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
