import { BikerParcel } from "@/hooks/bikers/useParcels";

export interface SenderParcel {
  pickupAddress: string;
  dropoffAddress: string;
  name: string;
}

const createParcel = async (parcel: SenderParcel) => {
  const res = await fetch(`${process.env.SERVER_URL}/parcels/senders`, {
    cache: "no-store",
    method: "POST",
    credentials: "include",
    body: JSON.stringify(parcel),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Network Error");
  if (res.status === 401)
    throw new Error("Parcel might be picked up by another biker.");
  if (res.status === 400) throw new Error("something's missing");
};

export default createParcel;
