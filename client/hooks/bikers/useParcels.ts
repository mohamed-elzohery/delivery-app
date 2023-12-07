import { getAllParcels } from "@/api/Parcel/getAllParcels";
import { ParcelStatus } from "@/api/Parcel/updateParcel";
import { useEffect, useState } from "react";

export interface BikerParcel {
  _id: string;
  name: string;
  pickupAddress: string;
  dropoffAddress: string;
  status: ParcelStatus;
}

const useParcels = () => {
  const [parcels, setParcels] = useState<BikerParcel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchParcels = async () => {
    try {
      setIsLoading(true);
      const parcels = await getAllParcels();
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

  return { parcels, parcelsLoading: isLoading };
};

export default useParcels;
