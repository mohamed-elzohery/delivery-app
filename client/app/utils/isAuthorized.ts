import getLoggedUser from "@/api/getLoggedUser";

export enum SystemRoles {
  BIKER = "Biker",
  SENDER = "Sender",
}

const isAuthorized: (role?: SystemRoles) => Promise<boolean> = async (
  role?: SystemRoles
) => {
  try {
    const loggedUser = await getLoggedUser();
    if (!loggedUser.currentUser) return false;

    if (!role) {
      return true;
    }

    return loggedUser.currentUser.role === role;
  } catch (err) {
    return false;
  }
};

export default isAuthorized;
