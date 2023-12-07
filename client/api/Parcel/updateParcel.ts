export enum ParcelStatus {
  "",
}
export enum ParcelStatus {
  PENDING = "pending",
  PICKED_UP = "picked up",
  DELIVERED = "delivered",
}

export interface ParcelUpdatedAttr {
  status: ParcelStatus;
  pickupTimestamp?: string;
  deliveryTimestamp?: string;
}
export const updateParcel = async (updatedProps: ParcelUpdatedAttr) => {
  const res = await fetch(`${process.env.baseURL}/parcels/bikers`, {
    cache: "no-store",
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(updatedProps),
  });
  if (!res.ok) throw new Error("Network Error");
  if (res.status === 401)
    throw new Error("Parcel might be picked up by another biker.");
};
