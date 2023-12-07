export const getAllParcels = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/parcels/bikers`, {
    cache: "no-store",
    credentials: "include",
  });
  const parcels = await res.json();
  return parcels;
};
