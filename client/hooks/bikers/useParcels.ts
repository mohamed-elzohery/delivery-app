import { getAllParcels } from "@/api/Parcel/getAllParcels";
import { ParcelStatus } from "@/api/Parcel/updateParcel";
import { Roles } from "@/app/login/page";
import { useEffect, useState } from "react";

export interface BikerParcel {
  _id: string;
  name: string;
  pickupTimestamp: string;
  dropoffTimestamp: string;
  pickupAddress: string;
  dropoffAddress: string;
  status: ParcelStatus;
}

const useParcels = (role: Roles) => {
  const [parcels, setParcels] = useState<BikerParcel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchParcels = async () => {
    try {
      setIsLoading(true);
      const parcels = await getAllParcels(role);
      setParcels(parcels);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { parcels, parcelsLoading: isLoading, fetchParcels };
};

export default useParcels;
