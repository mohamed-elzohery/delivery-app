import { Roles } from "@/app/login/page";

export const getAllParcels = async (role: Roles) => {
  const res = await fetch(`${process.env.SERVER_URL}/parcels/${role}`, {
    cache: "no-store",
    credentials: "include",
  });
  const parcels = await res.json();
  return parcels.data;
};
