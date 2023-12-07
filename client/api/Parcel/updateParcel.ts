export enum ParcelStatus {
  PENDING = "pending",
  PICKED_UP = "picked up",
  DELIVERED = "delivered",
}

export interface ParcelUpdatedAttr {
  status: ParcelStatus;
  pickupTimestamp?: string;
  dropoffTimestamp?: string;
}
export const updateParcel = async (
  id: string,
  updatedProps: ParcelUpdatedAttr
) => {
  console.log(updateParcel);
  const res = await fetch(`${process.env.SERVER_URL}/parcels/bikers/${id}`, {
    cache: "no-store",
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(updatedProps),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Network Error");
  if (res.status === 401)
    throw new Error("Parcel might be picked up by another biker.");
  if (res.status === 400) throw new Error("something's missing");
};
