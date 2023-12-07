"use client";
import logoutUser from "@/api/Auth/logout";
import { eraseCookie } from "@/utils/cookies/cookie";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();
    eraseCookie("token_uid");
    router.push("/login");
  };
  return (
    <header className="flex px-6 py-4 justify-end">
      <button
        onClick={handleLogout}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
