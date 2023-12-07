import getLoggedUser from "@/api/Auth/getLoggedUser";
import { SystemRoles } from "@/utils/isAuthorized";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

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

const useAuth = (role?: SystemRoles) => {
  const router = useRouter();
  const checkAuth = async () => {
    const isAllowable = await isAuthorized(role);
    if (isAllowable) return;
    return router.push("/login");
  };
  useLayoutEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAuth;
